import {Command} from '@core/Commands/Command';
import {TABLE_RESIZE} from '@/redux/types';

export class TableResizeCommand extends Command {
  type = TABLE_RESIZE
  static backupRow = [{field: 'rowState', value: {}}]
  static backupCol = [{field: 'colState', value: {}}]
  saveBackup(data) {
    if (data.field === 'rowState') {
      this.saveRow(data)
    } else {
      this.saveCol(data)
    }
  }
  undo(type) {
    if (type === 'row') {
      if (TableResizeCommand.backupRow.length > 1) {
        TableResizeCommand.backupRow.pop()
        return TableResizeCommand.backupRow[
            TableResizeCommand.backupRow.length - 1
        ]
      } return {}
    } else {
      if (TableResizeCommand.backupCol.length > 1) {
        TableResizeCommand.backupCol.pop()
        return TableResizeCommand.backupCol[
            TableResizeCommand.backupCol.length - 1
        ]
      }
    }
  }
  backupPop(backup) {
    const last =
        backup[backup.length - 1]
    const secToLast =
        backup[backup.length - 2]
    const lastKeys = Object.keys(last.value)
    const secToLastKeys = Object.keys(secToLast.value)
    const diff = lastKeys.filter(x => !secToLastKeys.includes(x))
    if (diff[0]) {
      backup.pop()
    }
  }
  saveRow(data) {
    const lastInBackup =
        TableResizeCommand.backupRow[TableResizeCommand.backupRow.length - 1]
    let lastValue = {field: data.field, value: data.last}
    const newValue = {field: data.field, value: data.value}
    const lastKeys = Object.keys(lastInBackup.value)
    const newKeys = Object.keys(newValue.value)
    const diff = newKeys.filter(x => !lastKeys.includes(x))
    if (diff[0]) {
      lastValue = {field: data.field, value: {...data.last, [diff]: 24}}
      TableResizeCommand.backupRow.push(lastValue)
    }
    TableResizeCommand.backupRow.push(
        {field: newValue.field, value: {...newValue.value}}
    )
  }
  saveCol(data) {
    const lastInBackup =
        TableResizeCommand.backupCol[TableResizeCommand.backupCol.length - 1]
    let lastValue = {field: data.field, value: data.last}
    const newValue = {field: data.field, value: data.value}
    const lastKeys = Object.keys(lastInBackup.value)
    const newKeys = Object.keys(newValue.value)
    const diff = newKeys.filter(x => !lastKeys.includes(x))
    if (diff[0]) {
      lastValue = {field: data.field, value: {...data.last, [diff]: 120}}
      TableResizeCommand.backupCol.push(lastValue)
    }
    TableResizeCommand.backupCol.push(
        {field: newValue.field, value: {...newValue.value}}
    )
  }
}
