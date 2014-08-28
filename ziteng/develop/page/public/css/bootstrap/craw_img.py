import re
import urllib
import os

filenames = ['bootstrap.min.css']

html = 'http://reocar.com/'
path = 'images'
pattern = re.compile(r'url\((.*?)\)')
results = []
p = ''

for fn in filenames:
    content = ''
    with open(fn, 'r') as f:
        content = f.read()
        t = pattern.findall(content)

        for r in t:
            try :
                tokens = r.split('/') 
                tokens.pop(0)
                if tokens[-1].endswith('"'):
                    tokens[-1] = tokens[-1][:len(tokens[-1])-1]
                url = html + '/'.join(tokens) # web image url
                tokens.pop(0)
                p = os.path.sep.join(tokens)  # file system path

                directory = os.path.split(p)[0]
                if not os.path.exists(directory):
                    os.makedirs(directory)

                urllib.urlretrieve(url, p)
            except IndexError:
                print r + "  *index*  " + p + "  filename:  " + fn
            except IOError:
                print r + "  *IO*  " + p + "  filename:  " + fn
        







    
