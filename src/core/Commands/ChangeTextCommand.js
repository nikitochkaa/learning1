import {Command} from '@core/Commands/Command';
import {CHANGE_TEXT} from '@/redux/types';

export class ChangeTextCommand extends Command {
  type = CHANGE_TEXT
}
