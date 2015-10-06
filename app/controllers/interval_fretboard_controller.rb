class IntervalFretboardController < ApplicationController
  before_filter :prepare_params, only: :index

  NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
  DEFAULT_TUNING = ['E', 'A', 'D', 'G', 'B', 'E']
  DEFAULT_NUM_STRINGS = 6
  DEFAULT_NUM_FRETS = 18
  DEFAULT_ROOT = 'E'
  DEFAULTS = [DEFAULT_NUM_FRETS, DEFAULT_NUM_STRINGS, DEFAULT_TUNING, DEFAULT_ROOT]
  
  def index
  end

  private

  def prepare_params
    @num_frets, @num_strings, @tuning, @root_note = DEFAULTS 
    @notes = NOTES

    # Later we can customize tunings
    # @num_strings = params[:num_strings].try(:to_i) || DEFAULT_NUM_STRINGS
    # @tuning = params[:tuning].try(:split, ',') || DEFAULT_TUNING

    # unless @num_strings == @tuning.size
    #   @num_strings, @tuning = [DEFAULT_NUM_STRINGS, DEFAULT_TUNING]
    # end
  end
end