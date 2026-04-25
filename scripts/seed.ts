import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type QQ = {
  slug: string;
  category: 'frontend' | 'data';
  subcategory: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  wrongExplanations: Record<string, string>;
  xpReward: number;
};

const questions: QQ[] = [
  // ---------------- FRONT-END: React ----------------
  {
    slug: 'react-virtual-dom',
    category: 'frontend', subcategory: 'react', difficulty: 'easy', xpReward: 10,
    question: 'What is React\'s Virtual DOM?',
    options: [
      'A real DOM running in a Web Worker',
      'An in-memory JavaScript tree used to diff and batch updates',
      'A browser built-in accessibility tree',
      'A CSS-only representation of the UI'
    ],
    correctIndex: 1,
    explanation: 'React keeps a lightweight in-memory tree of elements. When state changes, it diffs the new tree against the previous one and only patches the real DOM where needed — this is what makes React fast and declarative.',
    wrongExplanations: {
      '0': 'React does not run the DOM in a Web Worker; the Virtual DOM is just a plain JS object tree.',
      '2': 'The accessibility tree is a browser construct for assistive tech — unrelated to React.',
      '3': 'CSS has no awareness of component state; the Virtual DOM is a JavaScript concept.'
    }
  },
  {
    slug: 'react-usestate-closure',
    category: 'frontend', subcategory: 'react', difficulty: 'medium', xpReward: 15,
    question: 'Inside a setInterval in useEffect, why might `count` always log 0?',
    options: [
      'React freezes state inside intervals',
      'The callback captures the initial `count` value in its closure',
      'setInterval cannot read React state at all',
      'useEffect runs only once, so nothing updates'
    ],
    correctIndex: 1,
    explanation: 'JavaScript closures capture variables by reference to the scope at creation time. If the effect runs once (empty deps) the interval callback keeps referring to the original `count`. Use the functional form `setCount(c => c + 1)` or a ref.',
    wrongExplanations: {
      '0': 'React does not freeze state — it is your closure capturing a stale value.',
      '2': 'setInterval can read state; it just reads whatever the closure captured.',
      '3': 'useEffect running once is related but the real culprit is the stale closure around `count`.'
    }
  },
  {
    slug: 'react-keys',
    category: 'frontend', subcategory: 'react', difficulty: 'easy', xpReward: 10,
    question: 'Why should list items have a stable `key` prop?',
    options: [
      'Keys style each item differently',
      'Keys help React identify which items changed, preventing re-mounts and state loss',
      'Keys make the list items clickable',
      'Keys are required for TypeScript inference'
    ],
    correctIndex: 1,
    explanation: 'React uses keys to match items between renders. Stable keys let React reuse DOM nodes and component state. Using the array index can cause bugs when the list reorders or items are inserted.',
    wrongExplanations: {
      '0': 'Keys have no visual effect — they are a reconciliation hint.',
      '2': 'Clickability is unrelated; you add onClick handlers for that.',
      '3': 'Keys are a React runtime concept, not a TypeScript one.'
    }
  },
  {
    slug: 'react-usememo',
    category: 'frontend', subcategory: 'react', difficulty: 'medium', xpReward: 15,
    question: 'When is useMemo most useful?',
    options: [
      'To cache every computed value in the app',
      'To memoize expensive calculations so they are not recomputed on every render',
      'To replace useState entirely',
      'To prevent HTTP requests'
    ],
    correctIndex: 1,
    explanation: 'useMemo is intended for expensive derivations or for preserving referential equality of objects/arrays passed to memoized children. Overusing it adds complexity without measurable gain.',
    wrongExplanations: {
      '0': 'Blindly memoizing trivial values often makes code slower due to bookkeeping overhead.',
      '2': 'useMemo stores derived values — it does not manage state transitions.',
      '3': 'Network requests belong in useEffect or data-fetching libraries, not useMemo.'
    }
  },
  {
    slug: 'react-controlled-input',
    category: 'frontend', subcategory: 'react', difficulty: 'easy', xpReward: 10,
    question: 'What defines a "controlled" input in React?',
    options: [
      'Its value is stored in React state and updated via onChange',
      'It is wrapped in a <form> element',
      'It has a disabled attribute',
      'It uses defaultValue instead of value'
    ],
    correctIndex: 0,
    explanation: 'A controlled component has React as the single source of truth — the value comes from state, and every keystroke goes through onChange, giving you validation and consistent behavior.',
    wrongExplanations: {
      '1': 'Being inside a form does not make an input controlled.',
      '2': 'Disabled just prevents interaction; it has nothing to do with control.',
      '3': '`defaultValue` produces an *uncontrolled* input — the opposite.'
    }
  },

  // ---------------- FRONT-END: JavaScript ----------------
  {
    slug: 'js-let-const',
    category: 'frontend', subcategory: 'javascript', difficulty: 'easy', xpReward: 10,
    question: 'What is the key difference between `let` and `const`?',
    options: [
      '`const` variables cannot be reassigned, but objects they hold can still be mutated',
      '`const` makes objects deeply immutable',
      '`let` is function-scoped; `const` is block-scoped',
      'There is no difference — both are interchangeable'
    ],
    correctIndex: 0,
    explanation: 'const binds the identifier so you cannot reassign it, but the value itself (e.g. array/object contents) is still mutable. For true immutability use Object.freeze or immutable libraries.',
    wrongExplanations: {
      '1': 'const is NOT deep-freezing — `const arr = []; arr.push(1)` is perfectly legal.',
      '2': 'Both let and const are block-scoped; var is function-scoped.',
      '3': 'They differ in reassignability and signal intent to other developers.'
    }
  },
  {
    slug: 'js-event-loop',
    category: 'frontend', subcategory: 'javascript', difficulty: 'hard', xpReward: 20,
    question: 'In which order do these run: `console.log("A"); setTimeout(()=>console.log("B"),0); Promise.resolve().then(()=>console.log("C")); console.log("D");`?',
    options: [
      'A, B, C, D',
      'A, D, C, B',
      'A, D, B, C',
      'A, C, D, B'
    ],
    correctIndex: 1,
    explanation: 'Synchronous code runs first (A, D). Then the microtask queue (Promises) is drained before the next macrotask (C). Finally, the setTimeout macrotask fires (B). Microtasks always beat macrotasks at each loop tick.',
    wrongExplanations: {
      '0': 'setTimeout 0 is a macrotask and runs AFTER microtasks.',
      '2': 'Promises are microtasks and flush before timers.',
      '3': 'C cannot run before D — D is synchronous and executes immediately.'
    }
  },
  {
    slug: 'js-equality',
    category: 'frontend', subcategory: 'javascript', difficulty: 'easy', xpReward: 10,
    question: 'Which comparison does NOT perform type coercion?',
    options: ['==', '!=', '===', 'Object.is treats +0 and -0 as equal'],
    correctIndex: 2,
    explanation: '=== (strict equality) compares both value and type without any coercion. Prefer it to avoid subtle bugs like `0 == ""` being true.',
    wrongExplanations: {
      '0': '`==` performs coercion — `1 == "1"` is true.',
      '1': '`!=` also coerces; it is just the negated version of `==`.',
      '3': 'Object.is is coercion-free but actually treats +0 and -0 as DIFFERENT — the statement is false.'
    }
  },
  {
    slug: 'js-hoisting',
    category: 'frontend', subcategory: 'javascript', difficulty: 'medium', xpReward: 15,
    question: 'What happens when you access a `let` variable before its declaration?',
    options: [
      'You get `undefined`',
      'You get a ReferenceError due to the Temporal Dead Zone',
      'It is hoisted and initialized with null',
      'The engine implicitly converts it to var'
    ],
    correctIndex: 1,
    explanation: 'let and const are hoisted but not initialized. Accessing them before the declaration line throws a ReferenceError — the "Temporal Dead Zone" — which catches typos and misuse.',
    wrongExplanations: {
      '0': 'That is `var` behavior. `let` does not give you undefined early.',
      '2': 'let is never auto-initialized with null.',
      '3': 'There is no silent conversion between let and var.'
    }
  },

  // ---------------- FRONT-END: CSS ----------------
  {
    slug: 'css-box-model',
    category: 'frontend', subcategory: 'css', difficulty: 'easy', xpReward: 10,
    question: 'With `box-sizing: border-box`, a width of 200px includes what?',
    options: [
      'Only the content area',
      'Content + padding + border',
      'Content + padding + border + margin',
      'Nothing — it is ignored'
    ],
    correctIndex: 1,
    explanation: 'border-box makes the declared width/height include padding and border, so adding padding does not blow out your layout. It is the modern default most CSS resets apply.',
    wrongExplanations: {
      '0': 'That is `content-box` (the legacy default).',
      '2': 'Margin is always OUTSIDE the declared width, regardless of box-sizing.',
      '3': 'Width is never ignored when set.'
    }
  },
  {
    slug: 'css-flex-vs-grid',
    category: 'frontend', subcategory: 'css', difficulty: 'medium', xpReward: 15,
    question: 'Flexbox vs CSS Grid — which statement is most accurate?',
    options: [
      'Flexbox is one-dimensional; Grid is two-dimensional',
      'Grid only works in IE; Flexbox works everywhere',
      'Flexbox supports media queries, Grid does not',
      'They do exactly the same thing'
    ],
    correctIndex: 0,
    explanation: 'Flexbox distributes items along a single axis (row OR column) at a time. Grid lets you define rows AND columns simultaneously. Real layouts often combine both.',
    wrongExplanations: {
      '1': 'Grid is actually the one with limited legacy-IE support; both are great in modern browsers.',
      '2': 'Both respond to media queries — queries affect CSS as a whole.',
      '3': 'Their purposes overlap but are distinct; using each for its strengths yields cleaner code.'
    }
  },
  {
    slug: 'css-specificity',
    category: 'frontend', subcategory: 'css', difficulty: 'medium', xpReward: 15,
    question: 'Which selector has the HIGHEST specificity?',
    options: [
      'a.active',
      '#nav a',
      'div > a',
      'a[href]:hover'
    ],
    correctIndex: 1,
    explanation: 'IDs (0,1,0,0) beat classes, attributes, and pseudo-classes. `#nav a` is (0,1,0,1) which outranks the others. Inline styles beat IDs, and !important overrides specificity entirely.',
    wrongExplanations: {
      '0': '`a.active` is (0,0,1,1) — a class beats elements but loses to an ID.',
      '2': '`div > a` is (0,0,0,2) — two element selectors, very low.',
      '3': '`a[href]:hover` is (0,0,2,1) — still lower than an ID selector.'
    }
  },

  // ---------------- FRONT-END: Accessibility / General ----------------
  {
    slug: 'a11y-aria-label',
    category: 'frontend', subcategory: 'accessibility', difficulty: 'easy', xpReward: 10,
    question: 'When should you use `aria-label`?',
    options: [
      'On every element just to be safe',
      'To name an interactive element that has no visible text label',
      'To replace visible <label> tags in forms',
      'Only on <div> elements'
    ],
    correctIndex: 1,
    explanation: 'aria-label exposes an accessible name to screen readers when no visible text is available — e.g. an icon-only button. Prefer visible labels or <label for> whenever possible.',
    wrongExplanations: {
      '0': 'Over-labeling clutters the accessibility tree and can duplicate spoken content.',
      '2': 'Visible <label> elements are better for form fields — they help sighted users too.',
      '3': 'It can be applied to any element that accepts ARIA attributes.'
    }
  },
  {
    slug: 'rest-status-201',
    category: 'frontend', subcategory: 'rest', difficulty: 'easy', xpReward: 10,
    question: 'Which HTTP status code is most appropriate after successfully creating a resource with POST?',
    options: ['200 OK', '201 Created', '204 No Content', '301 Moved Permanently'],
    correctIndex: 1,
    explanation: '201 Created signals that a new resource was successfully created and typically includes a Location header pointing to it. 200 works but is less specific.',
    wrongExplanations: {
      '0': '200 means generic success — acceptable, but 201 communicates creation intent.',
      '2': '204 means success with no body and is typically used for DELETE.',
      '3': '301 is a redirect — it is not a success status.'
    }
  },

  // ---------------- DATA: SQL ----------------
  {
    slug: 'sql-inner-vs-left',
    category: 'data', subcategory: 'sql', difficulty: 'easy', xpReward: 10,
    question: 'What is the difference between INNER JOIN and LEFT JOIN?',
    options: [
      'INNER returns rows that match in both tables; LEFT returns all rows from the left table plus matches from the right',
      'INNER is faster; LEFT is slower — otherwise identical',
      'LEFT JOIN only works on primary keys',
      'INNER JOIN sorts the result; LEFT JOIN does not'
    ],
    correctIndex: 0,
    explanation: 'INNER JOIN keeps only matched rows. LEFT JOIN preserves every row from the left table, filling right-table columns with NULL when there is no match. Use LEFT when absence of match is meaningful.',
    wrongExplanations: {
      '1': 'Performance depends on indexes and selectivity, not on the join name.',
      '2': 'Joins can be on any column, not just primary keys.',
      '3': 'Neither join sorts the result; use ORDER BY for ordering.'
    }
  },
  {
    slug: 'sql-group-by',
    category: 'data', subcategory: 'sql', difficulty: 'medium', xpReward: 15,
    question: 'In `SELECT dept, COUNT(*) FROM emp GROUP BY dept HAVING COUNT(*) > 5`, what does HAVING do?',
    options: [
      'Filters rows before grouping',
      'Filters groups after aggregation',
      'Sorts the groups',
      'Adds an index to the query'
    ],
    correctIndex: 1,
    explanation: 'WHERE filters raw rows BEFORE aggregation; HAVING filters aggregated groups AFTER. That is why HAVING is the right place for conditions on COUNT, SUM, AVG, etc.',
    wrongExplanations: {
      '0': 'That is what WHERE does. HAVING works post-aggregation.',
      '2': 'Sorting is done with ORDER BY.',
      '3': 'Indexes are created with CREATE INDEX, not inline.'
    }
  },
  {
    slug: 'sql-window-function',
    category: 'data', subcategory: 'sql', difficulty: 'hard', xpReward: 20,
    question: 'Which SQL feature gives each row a running total without collapsing rows?',
    options: [
      'GROUP BY with SUM()',
      'A window function: SUM(amount) OVER (ORDER BY date)',
      'A LEFT JOIN to itself',
      'A CASE expression inside SELECT'
    ],
    correctIndex: 1,
    explanation: 'Window functions compute aggregates across a set of rows related to the current row without reducing rows. `SUM(...) OVER (ORDER BY ...)` is the canonical running total.',
    wrongExplanations: {
      '0': 'GROUP BY collapses rows and loses row-level detail.',
      '2': 'Self-joins can do it but are verbose and slow for running totals.',
      '3': 'CASE returns scalar values, not running aggregates.'
    }
  },
  {
    slug: 'sql-null-check',
    category: 'data', subcategory: 'sql', difficulty: 'easy', xpReward: 10,
    question: 'How do you check if a column is NULL in SQL?',
    options: ['col == NULL', 'col = NULL', 'col IS NULL', 'NULLIF(col)'],
    correctIndex: 2,
    explanation: 'NULL represents unknown. Any comparison with NULL using `=` or `!=` returns NULL (not true). You must use the ternary-logic-aware `IS NULL` / `IS NOT NULL` operators.',
    wrongExplanations: {
      '0': 'SQL uses `=` not `==`, and either way it wouldn\'t work for NULL.',
      '1': 'col = NULL evaluates to NULL and never to true.',
      '3': 'NULLIF is for converting matching values to NULL, not for checking.'
    }
  },

  // ---------------- DATA: Python / EDA ----------------
  {
    slug: 'py-pandas-loc-iloc',
    category: 'data', subcategory: 'python', difficulty: 'medium', xpReward: 15,
    question: 'In pandas, what is the difference between `.loc` and `.iloc`?',
    options: [
      '.loc uses integer positions; .iloc uses labels',
      '.loc uses labels (index names, column names); .iloc uses integer positions',
      'They are aliases for the same thing',
      '.loc is only for rows; .iloc is only for columns'
    ],
    correctIndex: 1,
    explanation: '.loc is label-based (e.g. `df.loc["2024-01", "sales"]`) and .iloc is position-based (e.g. `df.iloc[0, 2]`). Using the right one avoids subtle off-by-one bugs.',
    wrongExplanations: {
      '0': 'It is the reverse — that is precisely the wrong direction.',
      '2': 'They have different behavior, especially with non-sequential integer indexes.',
      '3': 'Both work on rows AND columns via a 2-axis selector.'
    }
  },
  {
    slug: 'py-missing-values',
    category: 'data', subcategory: 'python', difficulty: 'medium', xpReward: 15,
    question: 'Which is the most thoughtful first step when a column has 30% missing values?',
    options: [
      'Immediately drop the column',
      'Fill all missing values with 0',
      'Investigate WHY it is missing and choose between imputation, dropping, or modeling it as a signal',
      'Re-run the notebook until the missingness disappears'
    ],
    correctIndex: 2,
    explanation: 'Missingness can be random (MCAR), depend on other observed features (MAR), or depend on the missing value itself (MNAR). Good analysts understand the mechanism before picking mean/median imputation, dropping, or keeping a "missing" indicator.',
    wrongExplanations: {
      '0': 'Dropping can throw away real signal or bias the result.',
      '1': 'Zero is rarely a neutral value and can distort means and models.',
      '3': 'Reruns do not change data — this is a hopeful but incorrect approach.'
    }
  },
  {
    slug: 'py-numpy-vectorize',
    category: 'data', subcategory: 'python', difficulty: 'medium', xpReward: 15,
    question: 'Why are vectorized NumPy/pandas operations usually faster than a Python for-loop?',
    options: [
      'NumPy rewrites your code in Rust at runtime',
      'Vectorized operations run in C under the hood on contiguous arrays, avoiding per-element Python overhead',
      'Python for-loops are disabled in Jupyter',
      'NumPy skips type checks entirely'
    ],
    correctIndex: 1,
    explanation: 'Vectorized calls push the loop into optimized C code that operates on homogenous, contiguous memory (SIMD-friendly), bypassing the per-iteration cost of the Python interpreter.',
    wrongExplanations: {
      '0': 'NumPy uses C/Fortran, not a runtime rewrite to Rust.',
      '2': 'Loops run fine in Jupyter; they are just slow.',
      '3': 'NumPy dtypes are strict — there are still checks, just much cheaper ones.'
    }
  },

  // ---------------- DATA: Tableau / Viz ----------------
  {
    slug: 'viz-chart-choice-share',
    category: 'data', subcategory: 'visualization', difficulty: 'easy', xpReward: 10,
    question: 'You want to show monthly revenue trend over 2 years. Best chart?',
    options: ['Pie chart', 'Line chart', 'Treemap', 'Single KPI tile'],
    correctIndex: 1,
    explanation: 'Line charts are ideal for continuous variables over time — they make slope, seasonality, and inflection points immediately legible.',
    wrongExplanations: {
      '0': 'Pies show part-to-whole at a single point in time, not trends.',
      '2': 'Treemaps show hierarchy and size, not time series.',
      '3': 'A KPI tile shows one number — it cannot reveal a trend.'
    }
  },
  {
    slug: 'viz-dashboard-kpi',
    category: 'data', subcategory: 'visualization', difficulty: 'medium', xpReward: 15,
    question: 'What is a KPI in a business dashboard?',
    options: [
      'Any chart with a number on it',
      'A quantifiable measure tied to a business objective, tracked over time',
      'The database connection string',
      'A type of SQL index'
    ],
    correctIndex: 1,
    explanation: 'Key Performance Indicators are specific, measurable metrics that reflect progress toward strategic goals — e.g., monthly active users, gross margin, NPS. Good KPIs are actionable and comparable.',
    wrongExplanations: {
      '0': 'A random number does not become a KPI without strategic context.',
      '2': 'Connection strings are infrastructure, not business metrics.',
      '3': 'KPIs are business concepts, not database objects.'
    }
  },
  {
    slug: 'viz-color-blind',
    category: 'data', subcategory: 'visualization', difficulty: 'medium', xpReward: 15,
    question: 'To make a dashboard color-blind friendly, you should…',
    options: [
      'Use only red and green to emphasize good/bad',
      'Pair color with a second encoding (shape, label, or pattern) and pick palettes that work for deuteranopia/protanopia',
      'Rely on rainbow gradients for categorical data',
      'Add as many colors as possible so every item stands out'
    ],
    correctIndex: 1,
    explanation: 'About 8% of men have a form of color vision deficiency. Double-encoding (color + shape/text/pattern) plus CB-safe palettes (ColorBrewer, Viridis) keeps visuals legible for everyone.',
    wrongExplanations: {
      '0': 'Red/green is the most common problematic pairing for CVD viewers.',
      '2': 'Rainbow scales are perceptually non-uniform and poor for categories.',
      '3': 'Too many colors reduce distinguishability and increase cognitive load.'
    }
  },

  // ---------------- DATA: Statistics ----------------
  {
    slug: 'stat-correlation-causation',
    category: 'data', subcategory: 'statistics', difficulty: 'medium', xpReward: 15,
    question: 'Ice-cream sales and drownings rise together each summer. What is the best conclusion?',
    options: [
      'Ice cream causes drownings',
      'Drownings cause ice cream sales',
      'A third variable (hot weather) drives both — correlation is not causation',
      'The data must be wrong'
    ],
    correctIndex: 2,
    explanation: 'This is a classic confounder. Heat increases both ice-cream demand and swimming (hence drowning risk). Establishing causation requires controlled experiments or causal inference techniques.',
    wrongExplanations: {
      '0': 'There is no plausible direct mechanism — this is a spurious correlation.',
      '1': 'Reverse causation makes even less sense.',
      '3': 'The data is consistent; the interpretation is what needs care.'
    }
  },
  {
    slug: 'stat-mean-vs-median',
    category: 'data', subcategory: 'statistics', difficulty: 'easy', xpReward: 10,
    question: 'For income data with a few billionaires, which central tendency is more representative?',
    options: ['Mean', 'Median', 'Mode', 'Range'],
    correctIndex: 1,
    explanation: 'The mean is dragged upward by extreme outliers. The median (middle value) is robust to skew and better represents the "typical" observation for heavy-tailed distributions like income.',
    wrongExplanations: {
      '0': 'Mean is sensitive to outliers — billionaires will distort it badly.',
      '2': 'Mode is the most frequent value; rarely meaningful for continuous incomes.',
      '3': 'Range is a measure of spread, not center.'
    }
  }
];

async function main() {
  for (const q of questions) {
    await prisma.quizQuestion.upsert({
      where: { slug: q.slug },
      update: {
        category: q.category,
        subcategory: q.subcategory,
        difficulty: q.difficulty,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        wrongExplanations: q.wrongExplanations,
        xpReward: q.xpReward,
      },
      create: {
        slug: q.slug,
        category: q.category,
        subcategory: q.subcategory,
        difficulty: q.difficulty,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        wrongExplanations: q.wrongExplanations,
        xpReward: q.xpReward,
      },
    });
  }
  const count = await prisma.quizQuestion.count();
  console.log(`\u2728 Seeded. Total questions in DB: ${count}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
