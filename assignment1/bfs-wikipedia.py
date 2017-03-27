
# coding: utf-8

# An implementation of bfs based on Grokking Algorithms chapter 6 and NOC-S17-2-Intelligence-Learning bfs examples.
# Using a Breadth-First Algorithm (BFS), this script will search for the shortest way to get from one article in Wikipedia to a specific word or term used in another article.
# Cristóbal Valenzuela
# -------------

from collections import deque
import wikipedia
import time
import sys
wikipedia.set_lang("en")


print '''
-----
This script will search for the most efficient
way to get from one article in Wikipedia to a
another article that has a specific term in it.
-----
'''
begin = raw_input("Ready? (y/n):  ")
if begin != 'y':
    print 'Well....Hasta la vista'
    sys.exit()
else:
    pass

start_article = raw_input("Enter the name of a Wikipedia article from where to start (ie: 'Paul Cezanne'):  ")
search_term = raw_input("Enter a term or word of search for (ie: 'Gertrude Stein'): ")

print('''
Awesome!, I will search for the most efficient way to start from the %s Wikipedia article
and find the path to another article that talks about %s.
''' % (start_article, search_term))


raw_input("This may take me a while, so chill...Ok?")
#start_article = "New York University" # starting point
#search_term = 'Chile' # end point

# define the graph and starting point
graph = {}

# create a Node class
class Node:
    def __init__(self, name, parent):
        self.name = name
        self.parent = parent
        self.article = 'None'
        self.content = 'None'
        self.title = 'None'
        self.links = 'None'

    def get_article(self):
        try:
            self.article = wikipedia.page(self.name)
            self.content = self.article.content
            self.title = self.article.title
            self.links = self.article.links
        except:
            print 'Sorry! Something happend!'
            print 'Try again with another article!'
            #sys.exit()

# initialize the root node
root_node = Node(start_article, None)
root_node.get_article()
graph[root_node.title] = []
all_nodes = []

for article in root_node.links:
    graph[root_node.title].append(Node(article, root_node.title)) # add all of the first article links to the graph

#print root_node.links

def spinning_cursor():
    while True:
        for cursor in '|/-\\':
            yield cursor

# this is main loop
def search(name):
    print('''
    Searching how to get from %s to %s.
    ''' % (root_node.title, search_term))

    spinner = spinning_cursor()

    search_queue = deque() # create a new queue (double-ended queue)
    search_queue += graph[root_node.title] # add all of the root node urls to the search queue
    searched = [] # this array keeps track of which article we have already search for, so we dont search twice.
    while search_queue: # while the queue isn't empty
        # fancy spinner to wait
        sys.stdout.write(spinner.next())
        sys.stdout.flush()
        time.sleep(0.1)
        sys.stdout.write('\b')
        article = search_queue.popleft() # grabs the first article off the queue
        if not article.title in searched: # only search this article if we haven't already search for
            try:
                article.get_article() # get the content from wikipedia
                #print article.title
                if search_term in article.content: # check if article contains the search_term we are looking for
                    all_nodes.append(article)
                    print 'I found it!'
                    print 'Here is the first shortest path I discovered:'
                    current = article.title
                    path = []
                    while current != root_node.title:
                        for article in all_nodes:
                            if article.title == current:
                                path.append(article.title)
                                current = article.parent
                    path.append(start_article)
                    print('''
                    %s ---> the %s wikipedia article talks about %s!
                    ''' % (' ---> '.join(path[::-1]), path[0], search_term))
                    #print ' ---> '.join(path[::-1]) + ' ---> ' + path[0] + ' has ' + search_term + ' in it!'
                    print 'cool!'
                    return True
                else:
                    graph[article.title] = []
                    all_nodes.append(article)
                    for name in article.links:
                        graph[article.title].append(Node(name, article.title)) # add all of the first article links to the graph
                    search_queue += graph[article.title]
                searched.append(article.title) # mark this article as searched.
            except:
                pass
    print 'wops!'
    return False # if we reach here, the term was not find in the max of x iterations

# start the search
search(start_article)
