import { StyleSheet } from 'react-native';

// Colors (Keep these for theme consistency)
const colors = {
  background: '#000',
  text: '#fff',
  primary: 'rgba(147, 94, 255, 0.7)',
  inputBg: 'rgba(255, 255, 255, 0.2)',
  buttonBg: 'rgba(78, 78, 78, 0.71)',
  white: '#fff',
  buttonText: 'rgba(255, 255, 255, 0.2)',
};

// Create the exported styles object with proper TypeScript typing
export const styles = StyleSheet.create({
  // --- Layout ---
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
    alignItems: 'center',
    paddingTop: 4,
    marginBottom: 4,
  },

  // --- Typography ---
  title: {
    fontSize: 22,
    fontWeight: '600',
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
    fontWeight: '500',
  },
  darkButtonText: {
    color: '#272a32',
    fontSize: 12,
    fontWeight: '500',
  },

  // --- Forms ---
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  selectionButton: {
    backgroundColor: colors.buttonBg,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buttonIcon: {
    marginRight: 4,
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 18,
    backgroundColor: colors.white,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.white,
  },

  // --- Navigation ---
  linkContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  menuButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  menuButtonPressed: {
    opacity: 0.8,
  },
  menuButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
  },

  // --- Media ---
  logo: {
    width: 160,
    height: 60,
    resizeMode: 'contain',
  },
  videoTop: {
    width: 160,
    height: 40,
    borderRadius: 12,
  },

  // --- Terms ---
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 8,
    padding: 8,
    borderRadius: 5,
  },
  termsText: {
    color: colors.text,
    fontSize: 12,
  },
  termsBold: {
    fontWeight: 'bold',
  },

  // --- Feedback ---
  errorText: {
    color: '#ff5252',
    marginTop: 4,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
  successText: {
    color: '#4caf50',
    marginTop: 4,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
  
  // --- Modal Styles ---
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
  },
  modalView: {
    width: '60%', 
    margin: 20,
    backgroundColor: colors.buttonBg, 
    borderRadius: 5, 
    padding: 20, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18, 
    fontWeight: '600', 
    color: colors.text, 
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 12, 
    color: colors.text, 
    marginBottom: 5,
    textAlign: 'center',
    opacity: 0.8,
  },
  modalReferralCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary, 
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonPrimary: {
    backgroundColor: '#000', 
    borderColor: 'rgba(255, 255, 255, 0.2)', 
    borderWidth: 1,
    width: '100%', 
    marginHorizontal: 0, 
    height: 42, 
    borderRadius: 5, 
    alignItems: 'center', 
    justifyContent: 'center', 
    flexDirection: 'row', 
    gap: 8, 
    marginBottom: 10, 
  },
  modalButtonPrimaryPressed: {
    backgroundColor: '#333', 
  },
  modalButtonSecondary: {
    backgroundColor: 'transparent', 
    borderColor: 'rgba(255, 255, 255, 0.3)', 
    borderWidth: 1,
    width: '100%',
    marginHorizontal: 0,
    height: 42,
    borderRadius: 5, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  modalButtonSecondaryPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
  },
  modalButtonPrimaryText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  modalButtonSecondaryText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.8,
  },
  modalButtonIcon: {
    width: 16,
    height: 16,
  },
  mainContainer: { 
    flex: 1,
    backgroundColor: colors.white, 
  },
  mapView: {
    ...StyleSheet.absoluteFillObject, 
  },
  mainErrorText: { 
    position: 'absolute',
    top: 50, 
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#ff5252', 
    backgroundColor: 'rgba(0,0,0,0.7)', 
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    fontSize: 14,
    zIndex: 10, 
  },
  openModalButtonContainer: {
    position: 'absolute',
    bottom: 40, 
    left: 20,
    right: 20,
    alignItems: 'center', 
    zIndex: 10, 
  },
  openModalButton: {
    backgroundColor: colors.primary, 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5, 
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  openModalButtonPressed: {
    opacity: 0.8, 
  },
  openModalButtonText: {
    color: colors.white, 
    fontSize: 14,
    fontWeight: '600',
  },

  // --- Hamburger Menu Styles ---
  hamburgerButtonContainer: {
    position: 'absolute',
    top: 50, // Adjust based on status bar height if needed
    left: 15,
    zIndex: 20, // Ensure it's above map/other elements
  },
  hamburgerButton: {
    padding: 8, // Increase padding slightly
    backgroundColor: colors.primary, // Use a slightly transparent dark background (similar to buttonBg)
    borderRadius: 8, // Make it rounded
  },
  hamburgerIconText: { // Simple text icon for now
    fontSize: 28, // Increase font size for bigger icon
    color: colors.text, // Use main text color (white)
    fontWeight: 'bold',
  },
  menuOverlay: { // Covers the screen to close menu on tap
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent backdrop
    zIndex: 25, // Above hamburger button
  },
  menuContainer: {
    position: 'absolute',
    top: 105, // Increased top position to clear the button
    left: 15,
    backgroundColor: colors.buttonBg, // Dark background
    borderRadius: 8,
    padding: 8, // Match hamburger button padding
    zIndex: 30, // Above overlay
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  // --- End Hamburger Menu Styles ---
});
