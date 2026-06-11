import sys
import zipfile
import os

def extract_media(docx_path, out_dir):
    os.makedirs(out_dir, exist_ok=True)
    with zipfile.ZipFile(docx_path) as z:
        for name in z.namelist():
            if name.startswith('word/media/'):
                base = os.path.basename(name)
                out_path = os.path.join(out_dir, base)
                with open(out_path, 'wb') as f:
                    f.write(z.read(name))
                print(f"Extracted {name} to {out_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python extract_media.py <docx_path> <output_dir>")
        sys.exit(1)
    extract_media(sys.argv[1], sys.argv[2])
