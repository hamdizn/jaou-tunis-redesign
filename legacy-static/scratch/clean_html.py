import re

html_path = '/Users/mac/.gemini/antigravity-ide/scratch/jaou-tunis-redesign/index.html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to remove the comment block starting with <!-- right after <body> and ending with --> before <header>
cleaned = re.sub(r'<body>\s*<!--.*?-->\s*(?=<!-- Modern Glass Header|<header>)', '<body>\n\n  ', content, flags=re.DOTALL)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(cleaned)

print("Successfully cleaned index.html!")
