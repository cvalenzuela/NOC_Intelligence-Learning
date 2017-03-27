# BFS with Wikipedia articles and words/terms

Using a Breadth-First Algorithm (BFS), this script will search for the first shortest way to get from one article in Wikipedia to a specific word or term used in another article.


Install dependencies:

`pip install wikipedia`

Run:

`python bfs-wikipedia.py`

Here is what the interactive prompt looks like:

```
-----
This script will search for the first shortest
way to get from one article in Wikipedia to a
specific word or term used in another article.
-----

Ready? (y/n):  y
Enter the name of a Wikipedia article from where to start (ie: 'Paul Cezanne'):  Paul Cezanne
Enter a term or word of search for (ie: 'Gertrude Stein'): Gertrude Stein

Awesome!, I will search for the most efficient way to start from the Paul Cezanne Wikipedia article
and find the path to another article that talks about Gertrude Stein.

This may take me a while, so chill...Ok?

  Searching how to get from Paul Cézanne to Gertrude Stein.

I found it!
Here is the first shortest path I discovered:

  Paul Cezanne ---> Ambroise Vollard ---> the Ambroise Vollard wikipedia article talks about Gertrude Stein!

```

For articles and words that are not very related (like from 'Lionel Messi' to 'quantum mechanics') it may take a while or crash due to API requests. This works better with 'closer' articles and terms. It also works better when it goes from specific to general. The results are in alphabetical order.

## References

This is based on [Grokking Algorithms Chapter 6](https://manning-content.s3.amazonaws.com/download/2/656dfe9-e8fa-49ac-ac80-46584976ff49/GrokkingAlgorithms_SampleChapter6.pdf) and [NOC-S17-2-Intelligence-Learning bfs examples](https://github.com/shiffman/NOC-S17-2-Intelligence-Learning/tree/master/week1-graphs/02_bfs_oop).

Kind of related: [Wikipedia:Getting to Philosophy](https://en.wikipedia.org/wiki/Wikipedia:Getting_to_Philosophy) and [xefer wikipedia](https://xefer.com/wikipedia)
