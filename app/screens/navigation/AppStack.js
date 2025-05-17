import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../home/Home';
import {options} from '../../../lib/common';
import Accordion from '../home/Accordion';
import Box from '../home/Box';
import Button from '../home/Button';
import Carousel from '../home/Carousel';
import Checkbox from '../home/Checkbox';
import CircularProgress from '../home/CircularProgress';
import CircularTimer from '../home/CircularTimer';
import DataTable from '../home/DataTable';
import Drawer from '../home/Drawer';
import Dropdown from '../home/Dropdown';
import Input from '../home/Input';
import LoadingBar from '../home/LoadingBar';
import Menu from '../home/Menu';
import Modal from '../home/Modal';
import OtpInput from '../home/OtpInput';
import Picker from '../home/Picker';
import ProgressBar from '../home/ProgressBar';
import Switch from '../home/Switch';
import Tab from '../home/Tab';
import Toast from '../home/Toast';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const screens = [
    {
      id: 'home',
      name: 'Home',
      component: Home,
      options: options,
    },
    {
      id: 'accordion',
      name: 'Accordion',
      component: Accordion,
      options: options,
    },
    {
      id: 'box',
      name: 'Box',
      component: Box,
      options: options,
    },
    {
      id: 'button',
      name: 'Button',
      component: Button,
      options: options,
    },
    {
      id: 'carousel',
      name: 'Carousel',
      component: Carousel,
      options: options,
    },
    {
      id: 'checkbox',
      name: 'Checkbox',
      component: Checkbox,
      options: options,
    },
    {
      id: 'circular-progress',
      name: 'CircularProgress',
      component: CircularProgress,
      options: options,
    },
    {
      id: 'circular-timer',
      name: 'CircularTimer',
      component: CircularTimer,
      options: options,
    },
    {
      id: 'data-table',
      name: 'DataTable',
      component: DataTable,
      options: options,
    },
    {
      id: 'drawer',
      name: 'Drawer',
      component: Drawer,
      options: options,
    },
    {
      id: 'dropdown',
      name: 'Dropdown',
      component: Dropdown,
      options: options,
    },
    {
      id: 'input',
      name: 'Input',
      component: Input,
      options: options,
    },
    {
      id: 'loading-bar',
      name: 'LoadingBar',
      component: LoadingBar,
      options: options,
    },
    {
      id: 'menu',
      name: 'Menu',
      component: Menu,
      options: options,
    },
    {
      id: 'modal',
      name: 'Modal',
      component: Modal,
      options: options,
    },
    {
      id: 'otp-input',
      name: 'OtpInput',
      component: OtpInput,
      options: options,
    },
    {
      id: 'picker',
      name: 'Picker',
      component: Picker,
      options: options,
    },
    {
      id: 'progress-bar',
      name: 'ProgressBar',
      component: ProgressBar,
      options: options,
    },
    {
      id: 'switch',
      name: 'Switch',
      component: Switch,
      options: options,
    },
    {
      id: 'tab',
      name: 'Tab',
      component: Tab,
      options: options,
    },
    {
      id: 'toast',
      name: 'Toast',
      component: Toast,
      options: options,
    },
  ];

  return (
    <Stack.Navigator initialRouteName="Home">
      {screens.map(screen => (
        <Stack.Screen
          key={screen.id}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AppStack;
