const darkBg = '/assets/images/auth-dark-bg.png';
const darkAuthIcon = '/assets/icons/app-logo-dark.svg';
const succesTickDarkIcon = '/assets/icons/success-dark.svg';
const uploadImageIcon = '/assets//icons/upload-image.svg';
const uploadCloudDarkIcon = '/assets//icons/upload-cloud-dark.svg';
const uploadBtnDarkIcon = '/assets//icons/upload-btn-dark.svg';

// light theme icons
const lightBg = '/assets/images/auth-light-bg.png';
const lightAuthIcon = '/assets/icons/app-logo-light.svg';
const succesTickLightIcon = '/assets/icons/success-light.svg';
const uploadImageLightIcon = '/assets//icons/upload-image-light.svg';
const uploadCloudLightIcon = '/assets//icons/upload-cloud-light.svg';
const uploadBtnLightIcon = '/assets//icons/upload-btn-light.svg';

// common icon
const notificationIcon = '/assets/icons/notification.svg';
const unreadNotificationIcon = '/assets/icons/unread-notification.svg';
const forgotPasswordImg = '/assets/icons/forgot-password.svg';
const resetPasswordImg = '/assets/icons/reset-password.svg';
const dropdownUserIcon = '/assets/icons/user.svg';
const LogoutIcon = '/assets/icons/logout.svg';
const dropdownCartIcon = '/assets/icons/cart.svg';


export interface ThemeDataProps {
    authBgImg: string;
    authIcon: string;
    successTickIcon: string;
    fileUploadIcon: string;
    uploadCloudIcon: string;
    uploadBtnIcon: string;
  }
  // Common Icons and Images type interface
  export interface CommonDataProps {
    notificationIcon: string;
    unreadNotificationIcon: string;
    forgotPasswordImg: string;
    resetPasswordImg: string;
    dropdownUserIcon: string;
    LogoutIcon: string;
    dropdownCartIcon: string;
  }
  
  // dark theme icons
  export const darkThemeData: ThemeDataProps = {
    authBgImg: darkBg,
    authIcon: darkAuthIcon,
    successTickIcon: succesTickDarkIcon,
    fileUploadIcon: uploadImageIcon,
    uploadCloudIcon: uploadCloudDarkIcon,
    uploadBtnIcon: uploadBtnDarkIcon,
  };
  
  // light theme icons
  export const lightThemeData: ThemeDataProps = {
    authBgImg: lightBg,
    authIcon: lightAuthIcon,
    successTickIcon: succesTickLightIcon,
    fileUploadIcon: uploadImageLightIcon,
    uploadCloudIcon: uploadCloudLightIcon,
    uploadBtnIcon: uploadBtnLightIcon,
  };
  
  // common icons and images
  export const commonIcon: CommonDataProps = {
    notificationIcon: notificationIcon,
    unreadNotificationIcon: unreadNotificationIcon,
    forgotPasswordImg: forgotPasswordImg,
    resetPasswordImg: resetPasswordImg,
    dropdownUserIcon: dropdownUserIcon,
    LogoutIcon: LogoutIcon,
    dropdownCartIcon: dropdownCartIcon,
  };

  export type AllThemeDataProps = ThemeDataProps & CommonDataProps;