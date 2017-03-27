# BFS with Wikipedia articles and words/terms

Using a Breadth-First Algorithm (BFS), this script will search for the shortest way to get from one article in Wikipedia to a specific word or term used in another article.


Install dependencies:

`pip install wikipedia`

Run:

`python bfs-wikipedia.py`

Here is what the interactive prompt looks like:

```
Enter the name of a Wikipedia article from where to start (ie: 'French Revolution'):  Jeff Koons
Enter a term or word of search for (ie: 'economic freedoms'): science

Awesome!, I will search for the most efficent way to start from the Jeff Koons Wikipedia article
and find the path to another article that talks about science.

This may take me a while, so chill...Ok?

    Searching how to get from Jeff Koons to science.

I found it!
Here is the most efficent way:

                Jeff Koons ---> American Academy of Arts and Sciences ---> the American Academy of Arts and Sciences Wikipedia article talks about science.!
```

For articles and words that are not very related (like from 'Lionel Messi' to 'quantum mechanics') it may take a while. This works better with 'closer' articles and terms.

## References
--------

This is based on [Grokking Algorithms Chapter 6](https://manning-content.s3.amazonaws.com/download/2/656dfe9-e8fa-49ac-ac80-46584976ff49/GrokkingAlgorithms_SampleChapter6.pdf) and [NOC-S17-2-Intelligence-Learning bfs examples](https://github.com/shiffman/NOC-S17-2-Intelligence-Learning/tree/master/week1-graphs/02_bfs_oop).

Kind of related: [Wikipedia:Getting to Philosophy](https://en.wikipedia.org/wiki/Wikipedia:Getting_to_Philosophy) and [xefer wikipedia](https://xefer.com/wikipedia)
