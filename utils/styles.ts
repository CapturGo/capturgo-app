import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

// Colors
const colors = {
  background: '#000',
  text: '#fff',
  primary: 'rgba(147, 94, 255, 0.7)',
  inputBg: 'rgba(255, 255, 255, 0.2)',
  buttonBg: 'rgba(78, 78, 78, 0.71)',
  white: '#fff',
  buttonText: 'rgba(255, 255, 255, 0.2)',
};

// Feedback styles
const feedback = {
  errorText: {
    color: '#ff5252',
    marginTop: 4,
    textAlign: 'center' as const,
    fontSize: 12,
    fontWeight: '500' as const,
  },
  successText: {
    color: '#4caf50',
    marginTop: 4,
    textAlign: 'center' as const,
    fontSize: 12,
    fontWeight: '500' as const,
  },
};

// Typography
const typography = {
  title: {
    fontSize: 22,
    fontWeight: '600' as '600',
    color: colors.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.8,
  },
  bodyText: {
    fontSize: 12,
    color: colors.text,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 12,
    marginBottom: 6,
  },
  whiteButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500' as '500',
  },
  darkButtonText: {
    color: '#272a32',
    fontSize: 12,
    fontWeight: '500' as '500',
  },
};

// Layout
const layout = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 8,
    margin: 8,
  },
  formSection: {
    margin: 8,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center' as 'center',
    paddingTop: 4,
    marginBottom: 4,
  },
};

// Form Elements
const forms = {
  input: {
    height: 30,
    backgroundColor: colors.inputBg,
    borderRadius: 5,
    marginBottom: 8,
    paddingHorizontal: 8,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.white,
    height: 38,
    marginHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
    marginTop: 10,
  },
  selectionButton: {
    backgroundColor: colors.buttonBg,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 5,
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
    gap: 4,
  },
  buttonIcon: {
    marginRight: 4,
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  buttonGroup: {
    flexDirection: 'row' as 'row',
    flexWrap: 'wrap' as 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 18,
    backgroundColor: colors.white,
    borderRadius: 5,
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.white,
  },
};

// Navigation
const navigation = {
  linkContainer: {
    alignItems: 'center' as 'center',
    marginTop: 10,
    marginBottom: 16,
  },
};

// Media
const media = {
  logo: {
    width: 160,
    height: 60,
    resizeMode: 'contain',
  },
};

// Terms
const terms = {
  container: {
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
    justifyContent: 'space-between' as 'space-between',
    margin: 8,
    padding: 8,
    borderRadius: 5,
  },
  text: {
    color: colors.text,
    fontSize: 12,
  },
  bold: {
    fontWeight: 'bold' as 'bold',
  },
};

// Create the exported styles object with proper TypeScript typing
export const styles = StyleSheet.create({
  videoTop: {
    width: 160,
    height: 40,
    borderRadius: 12,
  },
  // Layout
  container: layout.container as ViewStyle,
  scrollView: layout.scrollView as ViewStyle,
  header: layout.header as ViewStyle,
  formSection: layout.formSection as ViewStyle,
  logoContainer: layout.logoContainer as ViewStyle,
  
  // Typography
  title: typography.title as TextStyle,
  subtitle: typography.subtitle as TextStyle,
  bodyText: typography.bodyText as TextStyle,
  sectionTitle: typography.sectionTitle as TextStyle,
  
  // Feedback
  errorText: feedback.errorText as TextStyle,
  successText: feedback.successText as TextStyle,

  // Form Elements
  input: forms.input as TextStyle,
  button: forms.button as ViewStyle,
  whiteButtonText: typography.whiteButtonText as TextStyle,
  darkButtonText: typography.darkButtonText as TextStyle,
  selectionButton: forms.selectionButton as ViewStyle,
  selectedButton: forms.selectedButton as ViewStyle,
  buttonGroup: forms.buttonGroup as ViewStyle,
  buttonIcon: forms.buttonIcon as TextStyle,
  checkbox: forms.checkbox as ViewStyle,
  checkboxChecked: forms.checkboxChecked as ViewStyle,
  
  // Navigation
  linkContainer: navigation.linkContainer as ViewStyle,
  
  // Media
  logo: media.logo as ImageStyle,
  
  // Terms
  termsContainer: terms.container as ViewStyle,
  termsText: terms.text as TextStyle,
  termsBold: terms.bold as TextStyle,
});
