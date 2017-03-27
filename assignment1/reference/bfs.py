# An implementation of bfs based on Grokking Algorithms chapter 6
# we are looking for someone who sells mangos
# -------------

from collections import deque

# add the first degree neighbors
graph = {}
graph["you"] = ["alice", "bob", "claire"]
graph["bob"] = ["anuj", "peggy"]
graph["alice"] = ["peggy"]
graph["claire"] = ["thom", "jonny"]
graph["anuj"] = []
graph["peggy"] = []
graph["thom"] = []
graph["jonny"] = []

# this is main loop to look from
def search(name):
    search_queue = deque() # create a new queue (double-ended queue)
    search_queue += graph["you"] # add all of your neighbors to the search queue
    searched = [] # this array keeps track of which people we have already search for, so we dont search twice.
    while search_queue: # while the queue isn't empty
        person = search_queue.popleft() # grabs the first person off the queue
        if not person in searched: # only search this person if we haven't already search for
            if person_is_seller(person): # check whether the person is a mango seller
                print person + " is a mango seller!" # yes, they are a mango seller
                return True
            else:
                search_queue += graph[person] # no, thery aren't. Add all of this person's friends to the search queue.
                searched.append(person) # marks this person as searched.
    return False # if we reach here, no one in the queue was a mango seller

# function to tell when someone is a mango seller
def person_is_seller(name):
    return name[-1] == 'm' # this checks if the persons name ends with a 'm'. If it ends, it's a mango seller.

search("you")
