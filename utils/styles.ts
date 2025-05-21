import { StyleSheet, Platform } from 'react-native';

// Colors (Keep these for theme consistency)
const colors = {
  background: '#000',
  text: '#fff',
  primary: 'rgba(147, 94, 255, 0.7)',
  primaryDark: 'rgba(147, 94, 255, 0.3)',
  primaryLight: 'rgba(147, 94, 255, 0.9)',
  inputBg: 'rgba(255, 255, 255, 0.2)',
  buttonBg: 'rgba(78, 78, 78, 0.71)',
  white: '#fff',
  buttonText: 'rgba(255, 255, 255, 0.2)',
  cardBg: 'rgba(0, 0, 0, 0.5)',
  toggleBgActive: 'rgba(147, 94, 255, 0.8)',
  toggleBgInactive: 'rgba(80, 80, 80, 0.8)',
  darkOverlay: 'rgba(30, 30, 30, 0.6)',
  error: '#ff5252',
  success: '#4caf50',
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
  // --- Card Components ---
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 10,
    padding: 20,
    margin: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.primaryDark,
  },
  
  // --- Toggle Components ---
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.darkOverlay,
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
  },
  toggleLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    color: colors.text,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  toggleButton: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    padding: 2,
  },
  toggleButtonActive: {
    backgroundColor: colors.toggleBgActive,
  },
  toggleButtonInactive: {
    backgroundColor: colors.toggleBgInactive,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  toggleThumbActive: {
    transform: [{ translateX: 22 }],
  },
  toggleThumbInactive: {
    transform: [{ translateX: 0 }],
  },
  
  // --- Balance Components ---
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  balanceIcon: {
    width: 32,
    height: 32,
    marginRight: 10,
    resizeMode: 'contain',
  },
  balanceText: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    textAlignVertical: 'center',
  },
  
  // --- Referral Code ---
  referralCodeText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    marginVertical: 10,
  },
  shareButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginTop: 10,
  },
  shareIcon: {
    width: 16,
    height: 16,
  },
  
  // --- Rewards List ---
  rewardItem: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardNumber: {
    color: colors.primaryLight,
    marginRight: 8,
    fontSize: 16,
  },
  
  openModalButtonPressed: {
    opacity: 0.8, 
  },
  openModalButtonText: {
    color: colors.white, 
    fontSize: 14,
    fontWeight: '600',
  },

 
  // --- Map Background Styles ---
  mapBackgroundView: {
    ...StyleSheet.absoluteFillObject,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  
  // --- Navigation Bar Styles ---
  navBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  navBarContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
  },
  navItemContainer: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 8,
    width: 90,
    height: 60,
  },
  navButtonActive: {
    backgroundColor: 'rgba(147, 94, 255, 0.7)',
  },
  navButtonInactive: {
    backgroundColor: 'transparent',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});
