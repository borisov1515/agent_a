"""Optimise the generated brand illustration for local site delivery."""
from pathlib import Path
from PIL import Image
import shutil

root = Path(__file__).resolve().parents[1]
source = Path(r"C:\Users\boris\.codex\generated_images\01a1588e-6cd2-7910-b06e-a45fcbe2d9a2\exec-1d9855fb-810a-481d-8543-f876ea852383.png")
archive = root.parent / "result" / "brand-art"
archive.mkdir(exist_ok=True)
shutil.copy2(source, archive / "knowledge-environment-original.png")
image = Image.open(source).convert("RGB")
for width, suffix in [(1200, ""), (640, "-small")]:
    output = image.copy()
    output.thumbnail((width, width), Image.Resampling.LANCZOS)
    target = root / "public" / "assets" / f"knowledge-environment{suffix}.webp"
    output.save(target, "WEBP", quality=85, method=6)
    print(target.name, output.size, target.stat().st_size)
