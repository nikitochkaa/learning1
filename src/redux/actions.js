// import {
//   CHANGE_TEXT,
//   CHANGE_STYLES,
//   TABLE_RESIZE,
//   APPLY_STYLE,
//   CHANGE_TITLE,
//   UPDATE_DATE
// } from './types';
import {ChangeTitleCommand} from '@core/Commands/ChangeTitleCommand';
import {TableResizeCommand} from '@core/Commands/TableResizeCommand';
import {ChangeTextCommand} from '@core/Commands/ChangeTextCommand';
import {ChangeStylesCommand} from '@core/Commands/ChangeStylesCommand';
import {ApplyStyleCommand} from '@core/Commands/ApplyStyleCommand';
import {REVERT_LAST_ACTION, UPDATE_DATE} from '@/redux/types';

// export function tableResize(data) {
//   return {
//     type: TABLE_RESIZE,
//     data
//   }
// }

// export function changeText(data) {
//   return {
//     type: CHANGE_TEXT,
//     data
//   }
// }

// export function changeStyles(data) {
//   return {
//     type: CHANGE_STYLES,
//     data
//   }
// }

// export function applyStyle(data) {
//   return {
//     type: APPLY_STYLE,
//     data
//   }
// }

// export function changeTitle(data) {
//   return {
//     type: CHANGE_TITLE,
//     data
//   }
// }

// export function updateDate() {
//   return {
//     type: UPDATE_DATE
//   }
// }

export function tableResize(data) {
  return new TableResizeCommand(data)
}

export function changeText(data) {
  return new ChangeTextCommand(data)
}

export function changeStyles(data) {
  return new ChangeStylesCommand(data)
}

export function applyStyle(data) {
  return new ApplyStyleCommand(data)
}

export function changeTitle(data) {
  return new ChangeTitleCommand(data)
}

export function updateDate() {
  return {type: UPDATE_DATE}
}

export function revertLastAction() {
  return {type: REVERT_LAST_ACTION}
}
