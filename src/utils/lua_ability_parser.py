import argparse
import json
import glob
import logging
import os
from collections import defaultdict
from enum import Enum
from typing import Union
from pathlib import Path

_DOT_EFFECT_NUMLINES = 11
_STATE_EFFECT_NUMLINES = 8

_DOT_EFFECT_DICT_KEYS = [
  'type',
  'stateDefenseModifiers',
  'pool',
  'damageOfHit',
  'duration',
  'strength',
  'potency',
  'chance',
  'primaryPercent',
  'secondaryPercent'
]
_STATE_EFFECT_DICT_KEYS = [
  'effectType',
  'defenderExlusionTimers',
  'defenderStateDefenseModifiers',
  'defenderJediStateDefenseModifiers',
  'stateChance',
  'stateStrength',
  'stateLength'
]

class EffectType(Enum):
  DOT = 1
  STATE = 2


def sanitize_line(val: str) -> str:
  """Removes unnecessary characters and other cruft from Lua file lines"""
  return val.replace(" ", "").replace("\"","").replace("'","").rstrip(",")


def effect_value_parser(val: str) -> Union[float, str, list[str]]:
  """Helper function when parsing effect values, used solely in list comprehension"""
  retval = ''
  val = sanitize_line(val)
  if val == ')':
    retval = 0.0
  else:
    try:
      retval = float(val)
    except ValueError:
      if '{' in val:
        retval = val.replace("{","").replace("}","").split(",")
      else:
        retval = val
    except Exception as err:
      raise
  return retval


def parse_effect_lines(indices: list[int], lines: list[str], numlines: int, effectType: EffectType) -> list[dict]:
  """Converts all Lua file lines that concern effect data (eg: dots and states) into JSON format"""
  effectArray = []
  for startIndex in indices:
      endIndex = startIndex + numlines
      effects = lines[startIndex+1:endIndex]
      dictEffect = {}
      if effectType == EffectType.DOT:
          dictEffect = dict(zip(_DOT_EFFECT_DICT_KEYS, [effect_value_parser(x) for x in effects]))
      elif effectType == EffectType.STATE:
          dictEffect = dict(zip(_STATE_EFFECT_DICT_KEYS, [effect_value_parser(x) for x in effects]))
      else:
          print("Unidentified effect type: ", effectType)
      effectArray.append(dictEffect)
  return effectArray


def parse_noneffect_lines(filelines: list) -> dict:
  """Converts all Lua file lines that don't have dot/state data into JSON format"""
  abilityDict = {}
  for line in filelines:
    # Ignore blank lines
    if len(line) == 0:
      continue
    # Ignore comments
    if line.startswith('--'):
      continue
    if "=" in line:
      key,val = line.split('=')
      key = key.replace(" ", "")
      val = sanitize_line(val)
      if val == '{':
        continue
      elif val == '}':
        continue
      else:
        # Valid key/value pair that should be recorded
        try:
          abilityDict[key] = float(val)
        except(TypeError, ValueError) as err:
          abilityDict[key] = val
        except:
          # Unknown exception
          raise
    else:
      if line.replace(" ", "") == '}' or line.replace(" ", "") == '},':
        continue
  return abilityDict


def lua_to_json(basepath, filename, filepath):
  print("Attempting to parse file: ", filepath)
  luaContents = ""
  # Each lua file is only a few dozen lines long at the most, so we can store in memory
  with open(filepath, 'r') as luafile:
    luaContents = luafile.read().replace("\t", "  ")
  splitLines = luaContents.splitlines()
  # Effects all span multiple lines and must be handled specially
  # For some reason, need to re-enumerate each time we scan for the specified string...
  # DoTs
  dotIndices = [i for i,line in enumerate(splitLines) if 'DotEffect(' in line]
  dotEffects = parse_effect_lines(dotIndices, splitLines, _DOT_EFFECT_NUMLINES, EffectType.DOT)
  # States
  stateIndices = [i for i,line in enumerate(splitLines) if 'StateEffect(' in line]
  stateEffects = parse_effect_lines(stateIndices, splitLines, _STATE_EFFECT_NUMLINES, EffectType.STATE)
  # Can now remove all lines handled by EffectType processing, back to front to avoid index confusion
  dotIndices.extend(stateIndices)
  dotIndices.sort(reverse=True)
  for i in dotIndices:
    del splitLines[i]
  # Iterate line-by-line to build JSON-able dict of remaining properties, ignoring
  # first line of parse-able file since that's the name of the command
  abilityDict = parse_noneffect_lines(splitLines[1:])
  abilityDict['dotEffects'] = dotEffects
  abilityDict['stateEffects'] = stateEffects
  # DEBUG dumps this specific ability to terminal
  '''
  print(f'JSON-ified version of {filename}:')
  print(json.dumps(abilityDict, sort_keys=True, indent=4))
  print('='*70)
  '''
  # Write ability to JSON file in "assets" directory
  outfileName = '../assets/' + filename.split('.')[0] + '.json'
  outfilePath = str((basepath / outfileName).resolve())
  with open(f'{outfilePath}', 'w') as outfile:
    outfile.write(json.dumps(abilityDict, sort_keys=True, indent=4))
    print(f"Written to {outfilePath}")


def print_ability_file(filename):
  print(f"Filename: {filename}")
  with open(filename, 'r') as jsonfile:
    print(json.dumps(json.loads(jsonfile.read()), sort_keys=True, indent=4))


def main():
  # Handle command line flags
  parser = argparse.ArgumentParser(description='Turn ability files in .lua scripts of cloned EiF-Public directory into well-formatted JSON files.')
  parser.add_argument('--print', action='store_true',  help='Print JSON files to terminal upon success.')
  parser.add_argument('--eif-public-path', default="../../../../EiF-Public/EiF-Public/MMOCoreORB/bin/scripts/commands", 
  help='Path to Eif-Public repository\'s "bin/scripts/commands" subdirectory. If not provided, assumes the  cloned repository is 4 levels up from this script.')
  args = vars(parser.parse_args())

  # Get absolute path from provided CLI repo path
  basepath = Path(__file__).parent
  resolvedpath = (basepath / args['eif_public_path']).resolve()
  # Transform .lua files from EIF repo into JSON files
  for root, dirs, files in os.walk(resolvedpath):
    print(root)
    for filename in files:
      # Read each lua file in specified dir
      if filename.endswith(".lua"):
        filepath = os.path.join(root, filename)
        lua_to_json(basepath, filename, filepath)
  
  # Dump ALL abilities json files if CLI option was specified
  if args['print']:
    list(map(lambda x: print_ability_file(x), glob.glob('*.json')))
  

if __name__=="__main__":
  main()