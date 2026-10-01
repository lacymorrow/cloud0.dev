from PIL import Image, ImageChops
import os,sys
rows=[]
for f in sorted(os.listdir('before')):
    if not f.endswith('.png'): continue
    a=Image.open('before/'+f).convert('L')
    try: b=Image.open('after/'+f).convert('L')
    except Exception: print(f,'missing'); continue
    w=max(a.width,b.width);h=max(a.height,b.height)
    A=Image.new('L',(w,h),255);A.paste(a);B=Image.new('L',(w,h),255);B.paste(b)
    d=ImageChops.difference(A,B).point(lambda v:255 if v>24 else 0)
    pct=100*sum(1 for v in d.tobytes() if v)/(w*h)
    rows.append((pct,f,a.size,b.size))
for r in sorted(rows,reverse=True): print(f"{r[0]:6.2f} {r[1]} {r[2]} {r[3]}")
