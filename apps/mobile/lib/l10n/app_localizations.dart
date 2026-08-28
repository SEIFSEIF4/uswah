import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_ar.dart';
import 'app_localizations_en.dart';
import 'app_localizations_tr.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'l10n/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale)
    : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
        delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[
    Locale('ar'),
    Locale('en'),
    Locale('tr'),
  ];

  /// No description provided for @appName.
  ///
  /// In en, this message translates to:
  /// **'Uswah'**
  String get appName;

  /// No description provided for @homeLabel.
  ///
  /// In en, this message translates to:
  /// **'Uswah, home'**
  String get homeLabel;

  /// No description provided for @navHome.
  ///
  /// In en, this message translates to:
  /// **'Home'**
  String get navHome;

  /// No description provided for @navSituations.
  ///
  /// In en, this message translates to:
  /// **'Situations'**
  String get navSituations;

  /// No description provided for @navSayings.
  ///
  /// In en, this message translates to:
  /// **'Sayings'**
  String get navSayings;

  /// No description provided for @navIntentions.
  ///
  /// In en, this message translates to:
  /// **'Intentions'**
  String get navIntentions;

  /// No description provided for @menu.
  ///
  /// In en, this message translates to:
  /// **'Menu'**
  String get menu;

  /// No description provided for @search.
  ///
  /// In en, this message translates to:
  /// **'Search'**
  String get search;

  /// No description provided for @saved.
  ///
  /// In en, this message translates to:
  /// **'Saved'**
  String get saved;

  /// No description provided for @theme.
  ///
  /// In en, this message translates to:
  /// **'Theme'**
  String get theme;

  /// No description provided for @language.
  ///
  /// In en, this message translates to:
  /// **'Language'**
  String get language;

  /// No description provided for @retry.
  ///
  /// In en, this message translates to:
  /// **'Retry'**
  String get retry;

  /// No description provided for @errorGeneric.
  ///
  /// In en, this message translates to:
  /// **'Something went wrong.'**
  String get errorGeneric;

  /// No description provided for @all.
  ///
  /// In en, this message translates to:
  /// **'All'**
  String get all;

  /// No description provided for @close.
  ///
  /// In en, this message translates to:
  /// **'Close'**
  String get close;

  /// No description provided for @homeIntro.
  ///
  /// In en, this message translates to:
  /// **'Practical guidance for real situations, answered from the Quran and Sahih hadith, with the source shown.'**
  String get homeIntro;

  /// No description provided for @latest.
  ///
  /// In en, this message translates to:
  /// **'Latest'**
  String get latest;

  /// No description provided for @homeIntentions.
  ///
  /// In en, this message translates to:
  /// **'The same day, differently'**
  String get homeIntentions;

  /// No description provided for @homeIntentionsDek.
  ///
  /// In en, this message translates to:
  /// **'Not new situations. The same everyday acts, seen through the intention behind them.'**
  String get homeIntentionsDek;

  /// No description provided for @allIntentions.
  ///
  /// In en, this message translates to:
  /// **'All intentions'**
  String get allIntentions;

  /// No description provided for @moreSituations.
  ///
  /// In en, this message translates to:
  /// **'More situations'**
  String get moreSituations;

  /// No description provided for @sayingsKnown.
  ///
  /// In en, this message translates to:
  /// **'Sayings you already know'**
  String get sayingsKnown;

  /// No description provided for @allSayings.
  ///
  /// In en, this message translates to:
  /// **'All sayings'**
  String get allSayings;

  /// No description provided for @browseEverything.
  ///
  /// In en, this message translates to:
  /// **'Browse everything'**
  String get browseEverything;

  /// No description provided for @minRead.
  ///
  /// In en, this message translates to:
  /// **'~{n} min read'**
  String minRead(int n);

  /// No description provided for @reviewedBy.
  ///
  /// In en, this message translates to:
  /// **'Reviewed by'**
  String get reviewedBy;

  /// No description provided for @notVerified.
  ///
  /// In en, this message translates to:
  /// **'Not verified'**
  String get notVerified;

  /// No description provided for @situationsTitle.
  ///
  /// In en, this message translates to:
  /// **'Situations'**
  String get situationsTitle;

  /// No description provided for @situationsLede.
  ///
  /// In en, this message translates to:
  /// **'Every situation the collection covers, answered from the Quran and Sahih hadith, with the source shown.'**
  String get situationsLede;

  /// No description provided for @allSituationsKicker.
  ///
  /// In en, this message translates to:
  /// **'All situations'**
  String get allSituationsKicker;

  /// No description provided for @whatToDo.
  ///
  /// In en, this message translates to:
  /// **'What to do'**
  String get whatToDo;

  /// No description provided for @translatedBy.
  ///
  /// In en, this message translates to:
  /// **'Translated by'**
  String get translatedBy;

  /// No description provided for @save.
  ///
  /// In en, this message translates to:
  /// **'Save'**
  String get save;

  /// No description provided for @saveThis.
  ///
  /// In en, this message translates to:
  /// **'Save this'**
  String get saveThis;

  /// No description provided for @savedLabel.
  ///
  /// In en, this message translates to:
  /// **'Saved'**
  String get savedLabel;

  /// No description provided for @saving.
  ///
  /// In en, this message translates to:
  /// **'Saving…'**
  String get saving;

  /// No description provided for @next.
  ///
  /// In en, this message translates to:
  /// **'Next'**
  String get next;

  /// No description provided for @topicsTitle.
  ///
  /// In en, this message translates to:
  /// **'All topics'**
  String get topicsTitle;

  /// No description provided for @topicsLede.
  ///
  /// In en, this message translates to:
  /// **'Every subject the collection covers, and what sits behind each one.'**
  String get topicsLede;

  /// No description provided for @nothingHere.
  ///
  /// In en, this message translates to:
  /// **'Nothing here yet.'**
  String get nothingHere;

  /// No description provided for @topics.
  ///
  /// In en, this message translates to:
  /// **'Topics'**
  String get topics;

  /// No description provided for @loadMore.
  ///
  /// In en, this message translates to:
  /// **'Load more'**
  String get loadMore;

  /// No description provided for @endOfList.
  ///
  /// In en, this message translates to:
  /// **'That is all of them.'**
  String get endOfList;

  /// No description provided for @newest.
  ///
  /// In en, this message translates to:
  /// **'Newest'**
  String get newest;

  /// No description provided for @shortest.
  ///
  /// In en, this message translates to:
  /// **'Shortest read'**
  String get shortest;

  /// No description provided for @topicMoney.
  ///
  /// In en, this message translates to:
  /// **'Money'**
  String get topicMoney;

  /// No description provided for @topicWork.
  ///
  /// In en, this message translates to:
  /// **'Work'**
  String get topicWork;

  /// No description provided for @topicFamily.
  ///
  /// In en, this message translates to:
  /// **'Family'**
  String get topicFamily;

  /// No description provided for @topicSelf.
  ///
  /// In en, this message translates to:
  /// **'Yourself'**
  String get topicSelf;

  /// No description provided for @topicFriendship.
  ///
  /// In en, this message translates to:
  /// **'People'**
  String get topicFriendship;

  /// No description provided for @topicHardship.
  ///
  /// In en, this message translates to:
  /// **'Hardship'**
  String get topicHardship;

  /// No description provided for @sayingsTitle.
  ///
  /// In en, this message translates to:
  /// **'Sayings you already know'**
  String get sayingsTitle;

  /// No description provided for @sayingsLede.
  ///
  /// In en, this message translates to:
  /// **'A phrase in wide circulation, and how the sources treat the same idea. Each carries the grade of what it is compared against.'**
  String get sayingsLede;

  /// No description provided for @pendingReviewer.
  ///
  /// In en, this message translates to:
  /// **'Awaiting a reviewer'**
  String get pendingReviewer;

  /// No description provided for @dorarCredit.
  ///
  /// In en, this message translates to:
  /// **'Hadith texts and gradings are quoted verbatim from the Hadith Encyclopedia at'**
  String get dorarCredit;

  /// No description provided for @parallel.
  ///
  /// In en, this message translates to:
  /// **'The parallel'**
  String get parallel;

  /// No description provided for @closeness.
  ///
  /// In en, this message translates to:
  /// **'How close it is'**
  String get closeness;

  /// No description provided for @readSituation.
  ///
  /// In en, this message translates to:
  /// **'Read the situation'**
  String get readSituation;

  /// No description provided for @pendingWhy.
  ///
  /// In en, this message translates to:
  /// **'Below the current publishing threshold. Until a scholarly reviewer joins the project, only the Quran and the two Sahih collections are published, so this comparison is shown but not relied on.'**
  String get pendingWhy;

  /// No description provided for @moreSayings.
  ///
  /// In en, this message translates to:
  /// **'More sayings'**
  String get moreSayings;

  /// No description provided for @gradeQuran.
  ///
  /// In en, this message translates to:
  /// **'Quran'**
  String get gradeQuran;

  /// No description provided for @gradeSahih.
  ///
  /// In en, this message translates to:
  /// **'Sahih'**
  String get gradeSahih;

  /// No description provided for @gradeHasan.
  ///
  /// In en, this message translates to:
  /// **'Hasan'**
  String get gradeHasan;

  /// No description provided for @gradeDisputed.
  ///
  /// In en, this message translates to:
  /// **'Disputed, verify'**
  String get gradeDisputed;

  /// No description provided for @gradeHistorical.
  ///
  /// In en, this message translates to:
  /// **'Historical account'**
  String get gradeHistorical;

  /// No description provided for @intentionsTitle.
  ///
  /// In en, this message translates to:
  /// **'The same day, differently'**
  String get intentionsTitle;

  /// No description provided for @intentionsLede.
  ///
  /// In en, this message translates to:
  /// **'An ordinary act becomes worship when the intention behind it is corrected. Not by doing more, but by knowing what it is for.'**
  String get intentionsLede;

  /// No description provided for @theAct.
  ///
  /// In en, this message translates to:
  /// **'The act'**
  String get theAct;

  /// No description provided for @theIntention.
  ///
  /// In en, this message translates to:
  /// **'The intention'**
  String get theIntention;

  /// No description provided for @groupWorship.
  ///
  /// In en, this message translates to:
  /// **'Worship'**
  String get groupWorship;

  /// No description provided for @groupBody.
  ///
  /// In en, this message translates to:
  /// **'Health'**
  String get groupBody;

  /// No description provided for @groupDaily.
  ///
  /// In en, this message translates to:
  /// **'Daily life'**
  String get groupDaily;

  /// No description provided for @groupOrder.
  ///
  /// In en, this message translates to:
  /// **'Time and order'**
  String get groupOrder;

  /// No description provided for @groupTravel.
  ///
  /// In en, this message translates to:
  /// **'Travel'**
  String get groupTravel;

  /// No description provided for @groupOccasions.
  ///
  /// In en, this message translates to:
  /// **'Occasions'**
  String get groupOccasions;

  /// No description provided for @groupPeople.
  ///
  /// In en, this message translates to:
  /// **'People'**
  String get groupPeople;

  /// No description provided for @groupService.
  ///
  /// In en, this message translates to:
  /// **'Service'**
  String get groupService;

  /// No description provided for @groupSelf.
  ///
  /// In en, this message translates to:
  /// **'Yourself'**
  String get groupSelf;

  /// No description provided for @groupLearning.
  ///
  /// In en, this message translates to:
  /// **'Learning'**
  String get groupLearning;

  /// No description provided for @groupKnowledge.
  ///
  /// In en, this message translates to:
  /// **'Teaching'**
  String get groupKnowledge;

  /// No description provided for @groupCraft.
  ///
  /// In en, this message translates to:
  /// **'Making things'**
  String get groupCraft;

  /// No description provided for @groupStewardship.
  ///
  /// In en, this message translates to:
  /// **'Land and animals'**
  String get groupStewardship;

  /// No description provided for @kindSituation.
  ///
  /// In en, this message translates to:
  /// **'Situation'**
  String get kindSituation;

  /// No description provided for @kindSaying.
  ///
  /// In en, this message translates to:
  /// **'Saying'**
  String get kindSaying;

  /// No description provided for @kindIntention.
  ///
  /// In en, this message translates to:
  /// **'Intention'**
  String get kindIntention;

  /// No description provided for @searchPlaceholder.
  ///
  /// In en, this message translates to:
  /// **'What happened?'**
  String get searchPlaceholder;

  /// No description provided for @nothingFound.
  ///
  /// In en, this message translates to:
  /// **'Nothing found.'**
  String get nothingFound;

  /// No description provided for @searching.
  ///
  /// In en, this message translates to:
  /// **'Searching'**
  String get searching;

  /// No description provided for @savedTitle.
  ///
  /// In en, this message translates to:
  /// **'Saved'**
  String get savedTitle;

  /// No description provided for @savedSituations.
  ///
  /// In en, this message translates to:
  /// **'Situations'**
  String get savedSituations;

  /// No description provided for @savedSayings.
  ///
  /// In en, this message translates to:
  /// **'Sayings'**
  String get savedSayings;

  /// No description provided for @nothingSaved.
  ///
  /// In en, this message translates to:
  /// **'Nothing saved yet.'**
  String get nothingSaved;

  /// No description provided for @signOut.
  ///
  /// In en, this message translates to:
  /// **'Sign out'**
  String get signOut;

  /// No description provided for @signInTitle.
  ///
  /// In en, this message translates to:
  /// **'Sign in'**
  String get signInTitle;

  /// No description provided for @signInLede.
  ///
  /// In en, this message translates to:
  /// **'Only needed to save situations. Everything else is open.'**
  String get signInLede;

  /// No description provided for @email.
  ///
  /// In en, this message translates to:
  /// **'Email'**
  String get email;

  /// No description provided for @sendCode.
  ///
  /// In en, this message translates to:
  /// **'Send a code'**
  String get sendCode;

  /// No description provided for @checkEmail.
  ///
  /// In en, this message translates to:
  /// **'Check your email'**
  String get checkEmail;

  /// No description provided for @codeSentTo.
  ///
  /// In en, this message translates to:
  /// **'We sent a six-digit code to'**
  String get codeSentTo;

  /// No description provided for @code.
  ///
  /// In en, this message translates to:
  /// **'Code'**
  String get code;

  /// No description provided for @signIn.
  ///
  /// In en, this message translates to:
  /// **'Sign in'**
  String get signIn;

  /// No description provided for @useOtherAddress.
  ///
  /// In en, this message translates to:
  /// **'Use a different address'**
  String get useOtherAddress;

  /// No description provided for @requestExpired.
  ///
  /// In en, this message translates to:
  /// **'That code request has expired. Start again.'**
  String get requestExpired;

  /// No description provided for @errRateLimit.
  ///
  /// In en, this message translates to:
  /// **'Too many requests. Wait a few minutes and try again.'**
  String get errRateLimit;

  /// No description provided for @errOtpExpired.
  ///
  /// In en, this message translates to:
  /// **'That code has expired. Request a new one.'**
  String get errOtpExpired;

  /// No description provided for @errOtpInvalid.
  ///
  /// In en, this message translates to:
  /// **'That code is not valid. Check it and try again.'**
  String get errOtpInvalid;

  /// No description provided for @invalidEmail.
  ///
  /// In en, this message translates to:
  /// **'Enter a valid email'**
  String get invalidEmail;

  /// No description provided for @fieldRequired.
  ///
  /// In en, this message translates to:
  /// **'This field is required'**
  String get fieldRequired;

  /// No description provided for @retryIn.
  ///
  /// In en, this message translates to:
  /// **'{s}s'**
  String retryIn(int s);

  /// No description provided for @share.
  ///
  /// In en, this message translates to:
  /// **'Share'**
  String get share;

  /// No description provided for @copyLink.
  ///
  /// In en, this message translates to:
  /// **'Copy link'**
  String get copyLink;

  /// No description provided for @linkCopied.
  ///
  /// In en, this message translates to:
  /// **'Link copied'**
  String get linkCopied;

  /// No description provided for @copyFailed.
  ///
  /// In en, this message translates to:
  /// **'Could not copy the link'**
  String get copyFailed;

  /// No description provided for @shareAsImage.
  ///
  /// In en, this message translates to:
  /// **'Share as image'**
  String get shareAsImage;

  /// No description provided for @shareThisSaying.
  ///
  /// In en, this message translates to:
  /// **'Share this saying'**
  String get shareThisSaying;

  /// No description provided for @cardText.
  ///
  /// In en, this message translates to:
  /// **'Text'**
  String get cardText;

  /// No description provided for @cardBoth.
  ///
  /// In en, this message translates to:
  /// **'Both'**
  String get cardBoth;

  /// No description provided for @cardOriginal.
  ///
  /// In en, this message translates to:
  /// **'Arabic'**
  String get cardOriginal;

  /// No description provided for @cardTranslation.
  ///
  /// In en, this message translates to:
  /// **'English'**
  String get cardTranslation;

  /// No description provided for @cardGround.
  ///
  /// In en, this message translates to:
  /// **'Ground'**
  String get cardGround;

  /// No description provided for @cardDimensions.
  ///
  /// In en, this message translates to:
  /// **'Dimensions'**
  String get cardDimensions;

  /// No description provided for @cardAlignment.
  ///
  /// In en, this message translates to:
  /// **'Alignment'**
  String get cardAlignment;

  /// No description provided for @cardType.
  ///
  /// In en, this message translates to:
  /// **'Type'**
  String get cardType;

  /// No description provided for @cardQr.
  ///
  /// In en, this message translates to:
  /// **'Link code'**
  String get cardQr;

  /// No description provided for @cardQrNote.
  ///
  /// In en, this message translates to:
  /// **'Scans back to the page'**
  String get cardQrNote;

  /// No description provided for @cardLogo.
  ///
  /// In en, this message translates to:
  /// **'Logo'**
  String get cardLogo;

  /// No description provided for @cardLogoNote.
  ///
  /// In en, this message translates to:
  /// **'Mark in the corner'**
  String get cardLogoNote;

  /// No description provided for @cardShare.
  ///
  /// In en, this message translates to:
  /// **'Share'**
  String get cardShare;

  /// No description provided for @naskh.
  ///
  /// In en, this message translates to:
  /// **'Naskh'**
  String get naskh;

  /// No description provided for @serif.
  ///
  /// In en, this message translates to:
  /// **'Serif'**
  String get serif;

  /// No description provided for @warm.
  ///
  /// In en, this message translates to:
  /// **'Warm'**
  String get warm;

  /// No description provided for @paper.
  ///
  /// In en, this message translates to:
  /// **'Paper'**
  String get paper;

  /// No description provided for @ink.
  ///
  /// In en, this message translates to:
  /// **'Ink'**
  String get ink;

  /// No description provided for @story.
  ///
  /// In en, this message translates to:
  /// **'Story'**
  String get story;

  /// No description provided for @square.
  ///
  /// In en, this message translates to:
  /// **'Square'**
  String get square;

  /// No description provided for @wide.
  ///
  /// In en, this message translates to:
  /// **'Wide'**
  String get wide;

  /// No description provided for @theySay.
  ///
  /// In en, this message translates to:
  /// **'They say'**
  String get theySay;

  /// No description provided for @weSay.
  ///
  /// In en, this message translates to:
  /// **'We say'**
  String get weSay;

  /// No description provided for @dorarLabel.
  ///
  /// In en, this message translates to:
  /// **'Text and grading: the Hadith Encyclopedia, Dorar.net'**
  String get dorarLabel;

  /// No description provided for @dorarNarrator.
  ///
  /// In en, this message translates to:
  /// **'Narrator'**
  String get dorarNarrator;

  /// No description provided for @dorarGradedBy.
  ///
  /// In en, this message translates to:
  /// **'Graded by'**
  String get dorarGradedBy;

  /// No description provided for @dorarSource.
  ///
  /// In en, this message translates to:
  /// **'Source'**
  String get dorarSource;

  /// No description provided for @dorarRuling.
  ///
  /// In en, this message translates to:
  /// **'Ruling'**
  String get dorarRuling;

  /// No description provided for @bookCardTitle.
  ///
  /// In en, this message translates to:
  /// **'The Hadith Encyclopedia · Hadith Sources'**
  String get bookCardTitle;

  /// No description provided for @bookFieldAuthor.
  ///
  /// In en, this message translates to:
  /// **'Author / supervisor'**
  String get bookFieldAuthor;

  /// No description provided for @bookFieldEditor.
  ///
  /// In en, this message translates to:
  /// **'Editor / translator'**
  String get bookFieldEditor;

  /// No description provided for @bookFieldPublisher.
  ///
  /// In en, this message translates to:
  /// **'Publisher'**
  String get bookFieldPublisher;

  /// No description provided for @bookFieldEdition.
  ///
  /// In en, this message translates to:
  /// **'Edition'**
  String get bookFieldEdition;

  /// No description provided for @bookFieldYear.
  ///
  /// In en, this message translates to:
  /// **'Publication year'**
  String get bookFieldYear;

  /// No description provided for @navToday.
  ///
  /// In en, this message translates to:
  /// **'Today'**
  String get navToday;

  /// No description provided for @today.
  ///
  /// In en, this message translates to:
  /// **'Today'**
  String get today;

  /// No description provided for @yesterday.
  ///
  /// In en, this message translates to:
  /// **'Yesterday'**
  String get yesterday;

  /// No description provided for @daysAgo.
  ///
  /// In en, this message translates to:
  /// **'{n} days ago'**
  String daysAgo(int n);

  /// No description provided for @swipeHint.
  ///
  /// In en, this message translates to:
  /// **'Lift the page for the day before'**
  String get swipeHint;

  /// No description provided for @read.
  ///
  /// In en, this message translates to:
  /// **'Read'**
  String get read;

  /// No description provided for @todaysIntention.
  ///
  /// In en, this message translates to:
  /// **'Today\'s intention'**
  String get todaysIntention;

  /// No description provided for @daysBehind.
  ///
  /// In en, this message translates to:
  /// **'{n} more days underneath'**
  String daysBehind(int n);

  /// No description provided for @settings.
  ///
  /// In en, this message translates to:
  /// **'Settings'**
  String get settings;

  /// No description provided for @appearance.
  ///
  /// In en, this message translates to:
  /// **'Appearance'**
  String get appearance;

  /// No description provided for @system.
  ///
  /// In en, this message translates to:
  /// **'System'**
  String get system;

  /// No description provided for @light.
  ///
  /// In en, this message translates to:
  /// **'Light'**
  String get light;

  /// No description provided for @dark.
  ///
  /// In en, this message translates to:
  /// **'Dark'**
  String get dark;

  /// No description provided for @openSettings.
  ///
  /// In en, this message translates to:
  /// **'Open settings'**
  String get openSettings;

  /// No description provided for @browse.
  ///
  /// In en, this message translates to:
  /// **'Browse'**
  String get browse;

  /// No description provided for @sourceHeading.
  ///
  /// In en, this message translates to:
  /// **'The source'**
  String get sourceHeading;

  /// No description provided for @aboutThis.
  ///
  /// In en, this message translates to:
  /// **'Why'**
  String get aboutThis;

  /// No description provided for @sayingsIndexHint.
  ///
  /// In en, this message translates to:
  /// **'Strongest evidence first'**
  String get sayingsIndexHint;

  /// No description provided for @hijri1.
  ///
  /// In en, this message translates to:
  /// **'Muharram'**
  String get hijri1;

  /// No description provided for @hijri2.
  ///
  /// In en, this message translates to:
  /// **'Safar'**
  String get hijri2;

  /// No description provided for @hijri3.
  ///
  /// In en, this message translates to:
  /// **'Rabi\' al-Awwal'**
  String get hijri3;

  /// No description provided for @hijri4.
  ///
  /// In en, this message translates to:
  /// **'Rabi\' al-Thani'**
  String get hijri4;

  /// No description provided for @hijri5.
  ///
  /// In en, this message translates to:
  /// **'Jumada al-Ula'**
  String get hijri5;

  /// No description provided for @hijri6.
  ///
  /// In en, this message translates to:
  /// **'Jumada al-Akhirah'**
  String get hijri6;

  /// No description provided for @hijri7.
  ///
  /// In en, this message translates to:
  /// **'Rajab'**
  String get hijri7;

  /// No description provided for @hijri8.
  ///
  /// In en, this message translates to:
  /// **'Sha\'ban'**
  String get hijri8;

  /// No description provided for @hijri9.
  ///
  /// In en, this message translates to:
  /// **'Ramadan'**
  String get hijri9;

  /// No description provided for @hijri10.
  ///
  /// In en, this message translates to:
  /// **'Shawwal'**
  String get hijri10;

  /// No description provided for @hijri11.
  ///
  /// In en, this message translates to:
  /// **'Dhu al-Qa\'dah'**
  String get hijri11;

  /// No description provided for @hijri12.
  ///
  /// In en, this message translates to:
  /// **'Dhu al-Hijjah'**
  String get hijri12;
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) =>
      <String>['ar', 'en', 'tr'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'ar':
      return AppLocalizationsAr();
    case 'en':
      return AppLocalizationsEn();
    case 'tr':
      return AppLocalizationsTr();
  }

  throw FlutterError(
    'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
    'an issue with the localizations generation tool. Please file an issue '
    'on GitHub with a reproducible sample app and the gen-l10n configuration '
    'that was used.',
  );
}
