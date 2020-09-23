import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../theme/color';
import { Fonts } from '../../constants';

const isIphoneX = Dimensions.get('window').height >= 812;

const styles = StyleSheet.create({
  // common
  flex: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  itemSeperator: {
    height: 1,
    backgroundColor: colors.seperator,
    marginVertical: 10,
  },
  subTitle: {
    fontFamily: Fonts.FjallaOne,
    fontSize: 16,
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreButton: {
    marginTop: 6,
  },
  readMoreButtonText: {
    color: colors.lightBlue,
    fontSize: 16,
  },
  segmentedControl: {
    marginVertical: 10,
    height: 32,
  },
  fontSize16: {
    fontSize: 16,
  },
  imageContainerShadow: {
    shadowColor: colors.black,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  customHeaderText: {
    color: colors.gold,
    fontFamily: Fonts.FjallaOne,
    fontSize: 30,
  },
  customGoBackButton: {
    top: isIphoneX ? -200 : -220,
    marginLeft: 20,
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  customGoBackIcon: {
    fontWeight: 'bold',
    marginRight: 6,
    alignSelf: 'center',
  },
  customGoBackText: {
    color: colors.gold,
    fontSize: 18,
    fontFamily: Fonts.FjallaOne,
  },
  borderRed: {
    borderColor: colors.red,
  },
  borderGreen: {
    borderColor: colors.green,
  },
  borderGold: {
    borderColor: colors.gold,
  },
  voteAverageText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  smallImage: {
    width: 75,
    height: 100,
    borderRadius: 4,
    marginTop: 10,
  },
  smallNoImage: {
    width: 75,
    height: 100,
    borderRadius: 4,
    backgroundColor: colors.lightGray,
    marginTop: 10,
  },
  // movies page
  moviesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  moviesHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moviesHeaderText: {
    fontSize: 40,
    marginBottom: 10,
    fontFamily: Fonts.FjallaOne,
    color: colors.gold,
  },
  moviesGridScrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  moviesGridMovieButton: {
    marginTop: 10,
    width: '28%',
    height: 150,
    borderRadius: 4,
    marginHorizontal: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  moviesGridImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  moviesGridVoteContainer: {
    backgroundColor: '#081c23',
    width: 30,
    height: 30,
    right: 0,
    position: 'absolute',
    top: -10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moviesGridVoteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  moviesGenreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // movieRow
  movieRowImage: {
    width: 100,
    height: 150,
    borderRadius: 4,
  },
  movieRowNoImage: {
    width: 100,
    height: 150,
    backgroundColor: '#CED0CE',
    borderRadius: 4,
  },
  movieRowTextContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
  },
  movieRowMovieTitle: {
    color: colors.gold,
    fontFamily: Fonts.FjallaOne,
    fontSize: 16,
  },
  movieRowVoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  movieRowReleaseDateText: {
    fontSize: 14,
    marginLeft: 10,
  },
  movieRowOverviewText: {
    fontSize: 16,
    color: 'gray',
    lineHeight: 20,
  },
  // movie detail
  movieDetailYoutube: {
    height: 240,
    width: '100%',
  },
  movieDetailBackdropImage: {
    width: '100%',
    height: 250,
  },
  movieDetailMovieTitle: {
    fontFamily: Fonts.FjallaOne,
    color: colors.gold,
    fontSize: 40,
    marginLeft: 20,
    bottom: isIphoneX ? 190 : 210,
  },
  movieDetailGenreContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    height: 44,
    bottom: 120,
  },
  movieDetailGenreButton: {
    borderRadius: 14,
    backgroundColor: colors.white,
    flexDirection: 'row',
    marginRight: 8,
    height: 28,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  movieDetailGenreText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  movieDetailGenreIcon: {
    marginLeft: 8,
  },
  movieDetailContainer: {
    paddingHorizontal: 10,
    bottom: 96,
  },
  movieDetailImage: {
    height: 150,
    width: 100,
    borderRadius: 8,
  },
  movieDetailListButtonContainer: {
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  movieDetailListButton: {
    width: '40%',
    flexDirection: 'row',
    height: 34,
    alignItems: 'center',
    paddingHorizontal: 6,
    marginHorizontal: 4,
    borderWidth: 1,
    borderRadius: 6,
  },
  movieDetailListButtonIcon: {
    marginRight: 6,
  },
  movieDetailRatingsText: {
    marginLeft: 12,
    fontSize: 12,
    fontWeight: '500',
  },
  movieDetailOverViewText: {
    color: colors.gray,
    lineHeight: 20,
    fontSize: 16,
  },
  movieDetailImageButton: {
    marginRight: 8,
    alignItems: 'center',
    width: 100,
  },
  movieDetailNameText: {
    fontSize: 12,
    textAlign: 'center',
  },
  movieDetailCharacterText: {
    fontSize: 12,
    textAlign: 'center',
    color: colors.gray,
  },
  movieDetailDirectorButton: {
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  movieDetailDirectorNameText: {
    color: colors.gray,
    marginLeft: 10,
  },
  //see all page
  seeAllContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  seeAllList: {
    marginTop: 10,
  },
  seeAllButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seeAllTextContainer: {
    marginLeft: 20,
  },
  seeAllNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  seeAllCharacterText: {
    color: colors.gray,
  },
  seeAllHeaderText: {
    color: colors.gold,
    fontWeight: 'bold',
    fontFamily: Fonts.FjallaOne,
    fontSize: 16,
    marginLeft: 4,
  },
  // genreMovieList
  genreListContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  //personDetail
  personDetailContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  personDetailDepartmentText: {
    marginTop: 4,
    fontSize: 16,
  },
  personDetailDescText: {
    fontSize: 16,
    color: colors.gray,
  },
  //discover
  discoverContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  discoverMovieButtonContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    height: '86%',
  },
  discoverMovieTitle: {
    fontSize: 18,
    marginVertical: 10,
    fontFamily: Fonts.FjallaOne,
  },
  discoverMovieImage: {
    width: '100%%',
    height: '100%',
    borderRadius: 6,
  },
  discoverMovieReleaseDate: {
    fontSize: 14,
    marginVertical: 10,
    fontFamily: Fonts.FjallaOne,
  },
  discoverMovieRandomButton: {
    flexDirection: 'row',
    marginVertical: 20,
    borderColor: colors.lightBlue,
    borderWidth: 1,
    width: 140,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  discoverMovieRandomText: {
    marginLeft: 10,
    color: colors.lightBlue,
  },
});

export default styles;
