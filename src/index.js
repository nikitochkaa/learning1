import {Router} from '@core/routes/Router';
import {DashboardPage} from '@/pages/DashboardPage';
import {ExcelPage} from '@/pages/ExcelPage';
import './scss/index.scss'
import {AuthPage} from '@/pages/AuthPage';

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
  auth: AuthPage,
})
