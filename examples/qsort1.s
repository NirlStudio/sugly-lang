(let data (load "sort-data").
(warn data)

(let sort (=> (start end)
  (if (start >= end) (return),

  (let mid (data:end),
  (let left start)
  (let right (end - 1),
  (while (left < right)
    (while
      (((data:left) < mid) && (left < right),
      (++ left)
    ),
    (while
      (((data:right) >= mid) && (left < right),
      (-- right)
    ),
    (data swap left right)
  ),
  (((data:left) >= mid) ? (data swap left end) (++ left),
  (do start (left - 1),
  (do (left + 1) end).
).

(sort 0 ((data length) - 1).
(exit data)
