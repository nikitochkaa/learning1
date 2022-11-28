import {Command} from '@core/Commands/Command';
import {CHANGE_STYLES} from '@/redux/types';

export class ChangeStylesCommand extends Command {
    type = CHANGE_STYLES
}
