from pathlib import Path
from PIL import Image

comic_dir = Path('/home/ubuntu/onara-lab/public/comics')
for source in sorted(comic_dir.glob('*.png')):
    target = source.with_suffix('.webp')
    image = Image.open(source).convert('RGB')
    image.save(target, 'WEBP', quality=82, method=6)
    print(f'{source.name}\t{source.stat().st_size}\t{target.name}\t{target.stat().st_size}')
