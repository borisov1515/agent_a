from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
root=Path(r'D:\Agent A\site\public\assets')
im=Image.new('RGB',(1200,630),'#f0f5fb');d=ImageDraw.Draw(im)
def font(size,bold=False):return ImageFont.truetype(str(Path(r'C:\Windows\Fonts')/('segoeuib.ttf' if bold else 'segoeui.ttf')),size)
mark=Image.open(root/'brand-mark.png').convert('RGBA');mark.thumbnail((39,39));im.paste(mark,(60,47),mark)
d.text((111,43),'AgentA  /  INSIGHTS',font=font(25,True),fill='#172c3d')
d.text((62,133),'LOCAL AI FOR BUSINESS',font=font(18,True),fill='#526575')
d.text((57,177),'Your knowledge.',font=font(79,True),fill='#172c3d')
d.text((57,267),'Your boundaries.',font=font(79,True),fill='#2859d9')
d.text((62,386),'What stays private, and what still needs protecting.',font=font(24),fill='#526575')
for x,label in [(62,'Documents'),(416,'Local AI'),(770,'Answer')]:
 d.rounded_rectangle((x,477,x+280,557),radius=10,fill='#ffffff',outline='#dce4ec',width=2)
 box=d.textbbox((0,0),label,font=font(25,True));d.text((x+(280-box[2])/2,496),label,font=font(25,True),fill='#172c3d')
for x in [354,708]:
 d.line((x,517,x+46,517),fill='#2859d9',width=3);d.line((x+38,510,x+46,517,x+38,524),fill='#2859d9',width=3)
im.save(root/'insights-cover.png',optimize=True)
print('Saved 1200x630 article cover')
