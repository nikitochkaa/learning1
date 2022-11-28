import {
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLE,
  CHANGE_TITLE,
  UPDATE_DATE, REVERT_LAST_ACTION
} from './types';
import {TableResizeCommand} from '@core/Commands/TableResizeCommand';

export function rootReducer(state, action) {
  let field
  let val
  let lastAction
  let save
  let type
  let backup
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      lastAction = {...state[field]}
      val = {...state,
        [field]: value(state, field, action),
        actionsHistory: [...state.actionsHistory, action]
      }
      action.saveBackup({
        field: field,
        last: lastAction,
        value: val[field]
      })
      return val
    case CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action),
        // actionsHistory: [...state.actionsHistory, action]
      }
    case CHANGE_STYLES:
      return {...state,
        currentStyles: action.data,
        // actionsHistory: [...state.actionsHistory, action]
      }
    case APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || {}
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.value}
      })
      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value},
        // actionsHistory: [...state.actionsHistory, action]
      }
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.data,
        // actionsHistory: [...state.actionsHistory, action]
      }
    case UPDATE_DATE:
      return {...state, openedDate: new Date().toJSON()}
    case REVERT_LAST_ACTION:
      if (state.actionsHistory[0]) {
        lastAction = state.actionsHistory.pop()
        switch (lastAction.type) {
          case TABLE_RESIZE:
            type = lastAction.data.type
            backup = type === 'row'?
                TableResizeCommand.backupRow :
                TableResizeCommand.backupCol
            val = lastAction.undo(type)
            field = val.field
            save = {
              ...state,
              [field]: val.value
            }
            lastAction.backupPop(backup)
            return save
          default: return state
        }
      } else {
        return state
      }
    default: return state
  }
}

function value(state, field, action) {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}
