chord-row[
  class="chord-row"
  action="appendToSelectedCol"
  strings=chord.length
  low=low
  string=-1
  rows=difference
  ]
each chord as |fret notes|
  tr
    chord-btn [
      action="toggleSelected"
      string=notes
      class="chord-column"
      fret=("btn-out" low false)
      ]
    yield fret notes
    chord-btn[
      action="toggleSelected"
      string=notes
      class="chord-column"
      fret=("btn-out" high true)
      ]
chord-row[
  class="chord-row"
  action="appendToSelectedCol"
  low=low
  strings=chord.length
  string=chord.length
  rows=difference
  ]
