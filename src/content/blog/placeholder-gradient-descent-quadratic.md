---
# PLACEHOLDER POST: shows the formatting features. Replace or delete this file.
title: 'Placeholder: Gradient Descent on a Quadratic, Step by Step'
date: 2026-09-20
description: A placeholder post demonstrating math, code highlighting, and other formatting.
tags: [optimization, notes]
---

> This is a placeholder post. It exists to show how Markdown, math and code
> render on the site.

Consider minimizing the quadratic $f(x) = \tfrac{1}{2} x^\top A x$ with a
symmetric positive-definite matrix $A$ whose eigenvalues are
$0 < \lambda_{\min} \le \dots \le \lambda_{\max}$. Gradient descent with step
size $\eta$ updates

$$
x_{t+1} = x_t - \eta \nabla f(x_t) = (I - \eta A)\, x_t .
$$

In the eigenbasis of $A$, each coordinate evolves independently as
$x_{t}^{(i)} = (1 - \eta \lambda_i)^t x_0^{(i)}$, so the iteration converges if
and only if $\eta < 2 / \lambda_{\max}$. The slowest direction contracts at rate
$|1 - \eta \lambda_{\min}|$, which is where the condition number
$\kappa = \lambda_{\max} / \lambda_{\min}$ enters.

## A quick simulation

```python
import numpy as np

A = np.diag([1.0, 10.0])   # condition number 10
x = np.array([1.0, 1.0])
eta = 0.15                 # below 2 / lambda_max = 0.2

for t in range(50):
    x = x - eta * A @ x

print(np.linalg.norm(x))  # → close to zero
```

## Things to try

1. Set `eta = 0.21` and watch the iterates diverge along the stiff direction.
2. Add momentum and compare the rate to $\frac{\sqrt{\kappa} - 1}{\sqrt{\kappa} + 1}$.

| Step size $\eta$ | Converges? |
| ---------------- | ---------- |
| 0.10             | yes        |
| 0.19             | yes        |
| 0.21             | no         |

Footnotes work too.[^1]

[^1]: This is a footnote, rendered at the end of the post.
