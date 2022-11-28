import {Command} from '@core/Commands/Command';
import {TABLE_RESIZE} from '@/redux/types';

export class TableResizeCommand extends Command {
  type = TABLE_RESIZE
  static backup = [{field: 'rowState', value: {}}]
  saveBackup(data) {
    const lastInBackup =
        TableResizeCommand.backup[TableResizeCommand.backup.length - 1]
    let lastValue = {field: data.field, value: data.last}
    const newValue = {field: data.field, value: data.value}
    const lastKeys = Object.keys(lastInBackup.value)
    const newKeys = Object.keys(newValue.value)
    const diff = newKeys.filter(x => !lastKeys.includes(x))
    if (diff[0]) {
      lastValue = {field: data.field, value: {...data.last, [diff]: 24}}
      TableResizeCommand.backup.push(lastValue)
    }
    TableResizeCommand.backup.push(
        {field: newValue.field, value: {...newValue.value}}
    )
  }
  undo() {
    if (TableResizeCommand.backup.length > 1) {
      TableResizeCommand.backup.pop()
      return TableResizeCommand.backup[TableResizeCommand.backup.length - 1]
    }
    return {}
  }
  pop() {
    const last =
        TableResizeCommand.backup[TableResizeCommand.backup.length - 1]
    const secToLast =
        TableResizeCommand.backup[TableResizeCommand.backup.length - 2]
    const lastKeys = Object.keys(last.value)
    const secToLastKeys = Object.keys(secToLast.value)
    const diff = lastKeys.filter(x => !secToLastKeys.includes(x))
    if (diff[0]) {
      TableResizeCommand.backup.pop()
    }
  }
}
