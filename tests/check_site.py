"""Static checks for the buildless Chalet Lune site (Python standard library)."""
from html.parser import HTMLParser
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.refs, self.images = [], [], []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        for key in ('src', 'href'):
            if key in attrs:
                self.refs.append(attrs[key])
        if tag == 'img':
            self.images.append(attrs)

parser = SiteParser()
parser.feed((ROOT / 'index.html').read_text())
assert len(parser.ids) == len(set(parser.ids)), 'Duplicate element IDs'
for ref in parser.refs:
    if ref.startswith('#'):
        assert ref[1:] in parser.ids, f'Missing anchor: {ref}'
    elif not re.match(r'\w+:|//', ref):
        assert (ROOT / ref).is_file(), f'Missing file: {ref}'
for img in parser.images:
    assert 'alt' in img, 'Image missing alternative text'
for name in ['living', 'rear-garden', 'front-patio', 'twin', 'family', 'shower', 'hallway', 'passage']:
    assert (ROOT / f'images/autumn/{name}.webp').is_file(), name
assert (ROOT / 'CNAME').read_text().strip() == 'moontribe.app'
assert (ROOT / '.nojekyll').exists()
assert '1277621739729972893' in (ROOT / 'index.html').read_text()
print(f'PASS: {len(parser.ids)} anchors, {len(parser.refs)} references, {len(parser.images)} images, 8 gallery assets, custom domain and booking link')
