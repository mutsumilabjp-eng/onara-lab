#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
output_dir="$repo_root/.gh-pages-publish"
base_url="${BASE_URL:-http://127.0.0.1:3000}"

rm -rf "$output_dir"
mkdir -p "$output_dir"
cp -a "$repo_root/dist/client/." "$output_dir/"

while IFS= read -r page_file; do
  if [[ "$page_file" == "index.html" ]]; then
    route="/"
  else
    route="/${page_file%/index.html}"
  fi
  mkdir -p "$output_dir/$(dirname "$page_file")"
  curl --fail --silent --show-error "$base_url$route" > "$output_dir/$page_file"
done < <(git -C "$repo_root" ls-tree -r --name-only gh-pages | grep -E '(^|/)index\.html$')

for root_file in 404.html CNAME .nojekyll; do
  git -C "$repo_root" show "gh-pages:$root_file" > "$output_dir/$root_file"
done

printf 'Exported %s pages to %s\n' "$(find "$output_dir" -name index.html | wc -l)" "$output_dir"
