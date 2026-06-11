import sys
import zipfile
import xml.etree.ElementTree as ET

def extract_docx_content(docx_path, output_path):
    ns = {
        'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
    }
    try:
        with zipfile.ZipFile(docx_path) as z:
            doc_xml = z.read('word/document.xml')
        root = ET.fromstring(doc_xml)
        body = root.find('w:body', ns)
        if body is None:
            print("Error: Could not find document body.")
            return
        tbls = root.findall('.//w:tbl', ns)
        with open(output_path, 'w', encoding='utf-8') as f:
            for child in body:
                if child.tag.endswith('p'):
                    text = "".join([t.text for t in child.findall('.//w:t', ns) if t.text])
                    if text.strip():
                        f.write(f"[P] {text.strip()}\n")
            for idx, tbl in enumerate(tbls):
                f.write(f"\n[TABLE {idx+1} START]\n")
                for row in tbl.findall('.//w:tr', ns):
                    row_data = []
                    for cell in row.findall('.//w:tc', ns):
                        cell_paragraphs = []
                        for cp in cell.findall('.//w:p', ns):
                            p_text = "".join([t.text for t in cp.findall('.//w:t', ns) if t.text])
                            if p_text.strip():
                                cell_paragraphs.append(p_text.strip())
                        cell_text = " / ".join(cell_paragraphs)
                        row_data.append(cell_text.strip())
                    f.write(" | ".join(row_data) + "\n")
                f.write(f"[TABLE {idx+1} END]\n\n")
    except Exception as e:
        print(f"Error reading docx: {e}")

def list_docx_media(docx_path):
    try:
        with zipfile.ZipFile(docx_path) as z:
            media_files = [f for f in z.namelist() if f.startswith('word/media/')]
            print(f"Media files inside DOCX: {len(media_files)}")
            for f in media_files:
                info = z.getinfo(f)
                print(f"  {info.filename} - {info.file_size} bytes")
    except Exception as e:
        print(f"Error listing media: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python read_docx.py <docx_path> <output_txt_path>")
        sys.exit(1)
    extract_docx_content(sys.argv[1], sys.argv[2])
    list_docx_media(sys.argv[1])
