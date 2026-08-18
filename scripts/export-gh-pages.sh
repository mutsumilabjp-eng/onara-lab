#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
output_dir="$repo_root/.gh-pages-publish"
base_url="${BASE_URL:-http://127.0.0.1:3000}"
site_url="https://onara-lab.com"

rm -rf "$output_dir"
mkdir -p "$output_dir"
cp -a "$repo_root/dist/client/." "$output_dir/"

affiliate_slugs() {
  sed -nE 's/^[[:space:]]*slug: "([^"]+)".*/\1/p' "$repo_root/app/affiliate-content.ts"
}

page_files() {
  git -C "$repo_root" ls-tree -r --name-only gh-pages | grep -E '(^|/)index\.html$'

  # 商品メモは動的ルートのため、過去のgh-pagesツリーに存在しない新規ページも明示的に出力する。
  while IFS= read -r slug; do
    printf 'affiliate/%s/index.html\n' "$slug"
  done < <(affiliate_slugs)

  # 比較検討ページも、初回公開時から静的出力の対象に含める。
  printf '%s\n' 'compare/gut-flora-tests/index.html'
}

while IFS= read -r page_file; do
  if [[ "$page_file" == "index.html" ]]; then
    route="/"
  else
    route="/${page_file%/index.html}"
  fi
  mkdir -p "$output_dir/$(dirname "$page_file")"
  curl --fail --silent --show-error "$base_url$route" > "$output_dir/$page_file"
done < <(page_files | sort -u)

for root_file in 404.html CNAME .nojekyll robots.txt sitemap.xml; do
  git -C "$repo_root" show "gh-pages:$root_file" > "$output_dir/$root_file"
done

# 動的商品メモと比較ページは、初回公開でもサイトマップへ必ず追加する。
add_sitemap_url() {
  local route="$1"
  local loc="${site_url}/${route}/"
  if ! grep -Fq "<loc>${loc}</loc>" "$output_dir/sitemap.xml"; then
    sed -i "s#</urlset>#  <url><loc>${loc}</loc></url>\n</urlset>#" "$output_dir/sitemap.xml"
  fi
}

while IFS= read -r slug; do
  add_sitemap_url "affiliate/${slug}"
done < <(affiliate_slugs)
add_sitemap_url "compare/gut-flora-tests"

printf 'Exported %s pages to %s\n' "$(find "$output_dir" -name index.html | wc -l)" "$output_dir"
