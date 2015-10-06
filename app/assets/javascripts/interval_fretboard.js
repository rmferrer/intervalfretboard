NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
INTERVALS = ['R', 'm2', 'M2', 'm3', 'M3', 'P4', 'TT', 'P5', 'm6', 'M6', 'm7', 'M7']
NUM_SEMITINES_IN_OCTAVE = 12

function notes_exist(notes){
  for (var i = 0; i < notes.length; i++){
    var note = notes[i]
    if (NOTES.indexOf(note) == -1){
      return false;
    }
  }
  return true;
}

function compute_interval(reference_note, other_note){
  if (!notes_exist([reference_note, other_note])){
    return null;
  }
  if (reference_note == other_note){
    return INTERVALS[0];
  }
  var reference_note_index = NOTES.indexOf(reference_note);
  var num_notes_sliced = reference_note_index + 1;
  var other_note_index = NOTES.slice(num_notes_sliced).indexOf(other_note) + num_notes_sliced;

  var semitone_interval = other_note_index - reference_note_index;
  return INTERVALS[semitone_interval];
}

function note_plus_semitones(note, num_semitones){
  if (!notes_exist([note])){
    return null;
  }
  var num_semitones = num_semitones % NUM_SEMITINES_IN_OCTAVE;
  var note_index = NOTES.indexOf(note);
  var new_note_index = note_index + num_semitones;
  return NOTES[new_note_index];
}

document.onready = function(){
  var num_strings = 6;  
  for (var s=0; s < num_strings; s++){
    var open_string_elem = document.getElementById("open-string-" + s);
    fill_out_string_intervals(open_string_elem);    
    open_string_elem.onchange = function(){
      fill_out_string_intervals(this);    
    }
  }

  var root_note = document.getElementById('root-note');
  root_note.onchange = function(){
    for (var s=0; s < num_strings; s++){
      var open_string_elem = document.getElementById("open-string-" + s);
      fill_out_string_intervals(open_string_elem);    
    }
  }
}

function fill_out_string_intervals(open_string_elem){
  var open_string_note = open_string_elem.value.trim();
  var s = parseInt(open_string_elem.id.slice(-1));
  var num_frets = parseInt(document.getElementById('num-frets').innerText.trim());
  var root_note = document.getElementById('root-note').value.trim();
  
  for (var f=1; f < num_frets; f++){
    var fretted_note = note_plus_semitones(open_string_note, f);
    var interval = compute_interval(root_note, fretted_note);
    
    var elemId = "string-" + s + "-fret-" + f;
    var elem = document.getElementById(elemId);
    elem.innerText = interval;

    if (interval == 'R'){
      elem.style.border = "1px solid black";
    }
    else{
      elem.style.border = "1px solid #CDCDCD";
    }
  }
}