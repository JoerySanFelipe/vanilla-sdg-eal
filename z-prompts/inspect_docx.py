import sys
import zipfile
import xml.etree.ElementTree as ET

def inspect(docx_path):
    ns = {
        'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
        'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
    }
    with zipfile.ZipFile(docx_path) as z:
        doc_xml = z.read('word/document.xml')
        rels_xml = z.read('word/_rels/document.xml.rels')
    rels_root = ET.fromstring(rels_xml)
    rid_to_target = {}
    for rel in rels_root.findall('.//{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
        rid_to_target[rel.get('Id')] = rel.get('Target')
    root = ET.fromstring(doc_xml)
    body = root.find('w:body', ns)
    el_idx = 0
    for child in body:
        tag = child.tag.split('}')[-1]
        if tag == 'p':
            text = "".join([t.text for t in child.findall('.//w:t', ns) if t.text])
            drawings = child.findall('.//w:drawing', ns)
            imgs = []
            for d in drawings:
                blip = d.find('.//{http://schemas.openxmlformats.org/drawingml/2006/main}blip')
                if blip is not None:
                    embed_rid = blip.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                    img_path = rid_to_target.get(embed_rid, "unknown")
                    imgs.append(f"Image[rId={embed_rid}, path={img_path}]")
            img_str = " | ".join(imgs)
            if text.strip() or img_str:
                print(f"[{el_idx}] P: {text.strip()} {img_str}")
                el_idx += 1
        elif tag == 'tbl':
            print(f"[{el_idx}] TABLE START:")
            rows = child.findall('.//w:tr', ns)
            for r_idx, row in enumerate(rows):
                cells = row.findall('.//w:tc', ns)
                cell_texts = []
                for c_idx, cell in enumerate(cells):
                    cell_p_texts = []
                    for cp in cell.findall('.//w:p', ns):
                        p_text = "".join([t.text for t in cp.findall('.//w:t', ns) if t.text])
                        cell_drawings = cp.findall('.//w:drawing', ns)
                        cell_imgs = []
                        for cd in cell_drawings:
                            blip = cd.find('.//{http://schemas.openxmlformats.org/drawingml/2006/main}blip')
                            if blip is not None:
                                embed_rid = blip.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                                img_path = rid_to_target.get(embed_rid, "unknown")
                                cell_imgs.append(f"Image[rId={embed_rid}, target={img_path}]")
                        img_str = ", ".join(cell_imgs)
                        if p_text.strip() or img_str:
                            cell_p_texts.append(f"{p_text.strip()} {img_str}".strip())
                    cell_texts.append(f"C{c_idx}: " + " / ".join(cell_p_texts))
                print(f"  Row {r_idx}: " + " | ".join(cell_texts))
            print(f"[{el_idx}] TABLE END")
            el_idx += 1

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python inspect_docx.py <docx_path>")
        sys.exit(1)
    inspect(sys.argv[1])
