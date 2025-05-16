---
layout: post.njk
title: "DeepMind Launches AlphaEvolve"
date: 2025-05-16
author: " William Wale"
lang: en
permalink: /en/articles/alphaevolve_article/
description: "Google DeepMind launches AlphaEvolve, a composite system capable of many new tasks.."
image: "/img/articles/alpha_evolve_illus.jpg"
---

### Google DeepMind Launches AlphaEvolve

The 14th of May 2025, Google DeepMind launched an AI system they call AlphaEvolve. This is a composite system that uses multiple instances of large language models to improve solutions to technical problems.

DeepMind applied the system to several open problems in mathematics and managed to find improvements to problems mathematicians have worked on for decades. For example, they managed to find a more efficient way to multiply matrices. This is incredibly impressive as the last improvement for this specific class of matrices occurred 56 years ago.

They also used the system to improve many technical systems used within Google. For example, they had the system streamline how their servers handle data processing jobs and how specific computations performed when their language models are trained are done.


### How does AlphaEvolve work?

AlphaEvolve is not a language model, but a system that uses language models as a subcomponent. The system is given a problem, and then works by taking an existing solution to a problem and modifying it many times. Then it uses an evaluation function to keep the changes that cause improvement and discard the rest. This is a well-known method in AI called an evolutionary algorithm. What is new with AlphaEvolve is that the system uses language models to generate these modifications. In this way, the solutions can evolve much more flexibly. This description is a little bit vague, a more precise description follows:

1. The system user starts by providing:
    1.1 A starting prompt that describes the problem and what the system should do.
    1.2 A well-defined objective function (a mathematical algorithm that measures how good a candidate solution is).
        1.2.1 For example, if you want AlphaEvolve to write a program that runs quickly, the objective function could be a function that measures how long the candidate solution took to run.
    1.3 An initial program (or another form of solution) that AlphaEvolve will attempt to improve.

2.  AlphaEvolve then initiates an iterative process:
    2.1 A "generator" language model, guided by the starting prompt, creates several proposals for how the initial program can be changed or improved. These proposals can range from minor adjustments to entirely new approaches.
    2.2 Each new candidate solution is then thoroughly tested and evaluated by the objective function. The result is a score that indicates how good the solution is.
3.  The system selects the candidate solutions that have received the best scores. Often, some solutions that may not be the best right now but represent interesting or new directions are also kept. This helps the system avoid getting locked into a single type of solution too early.

4.  These selected solutions then become the starting point for the next round. They can be fed back to the generator language model for further development (returning to point 2.1), or other specialized language models can attempt to combine the best features from several different successful candidates.

5.  This cycle of idea generation, modification, testing, and selection is repeated hundreds or thousands of times. With each cycle, the goal is for the solutions to gradually improve.

### Consequences

AlphaEvolve is sure to have significant effects on several areas within science and technology. A potentially frightening impact is that AlphaEvolve will affect AI systems' ability to accelerate AI development itself. An example of this we already see in DeepMind's report is that innovations developed by AlphaEvolve led to the training of Gemini (the model family AlphaEvolve is built on) taking approximately 1% less time. The researchers comment on this in their article:

>Beyond distillation, it is also intriguing that AlphaEvolve can make practical discoveries that increase the efficiency of its own infrastructure and of (future versions of) its base LLMs. Currently, the gains are moderate and the feedback loops for improving the next version of AlphaEvolve are on the order of months. However, with these improvements we envision that the value of setting up more environments (problems) with robust evaluation functions will become more widely recognized, which in turn will result in more high-value practical discoveries going forward.

In the same vein, they also talk about "distillation," a method where Gemini models can be made smarter by training on the solutions that the entire AlphaEvolve system has spent thousands of hours generating. After they have done this, the Gemini models become smarter, and the new Gemini models can be incorporated into AlphaEvolve, making the entire system smarter. This can create a self-reinforcing cycle.

> On the other hand, a natural next step will be to consider distilling the AlphaEvolve-augmented performance of the base LLMs into the next generation of the base models. This can have intrinsic value and also, likely, uplift the next version of AlphaEvolve.

Both of these methods (assuming they work as well as we believe they will) will lead to the development of AI systems continuing, and potentially progressing much faster.

A potential negative consequence is that the systems we use may become harder to understand. If, in a few years, large parts of the infrastructure used internally at Google are designed by AI and not humans, this will limit humans' ability to understand what is happening. This can have catastrophic consequences if AI systems optimize for the wrong things, and if people do not consciously work to maintain an overview of what the systems are doing.



### Links
*   [AlphaEvolve Lansert](https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/)
*   [AlphaEvolve Forskningsartikkel](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/AlphaEvolve.pdf)
