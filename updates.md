# Flicks Updates

This file will be designated to version logs and future updates I can make. I am happy with the work I did during the bootcamp but I know there are plenty more improvements and features to make.

## Version 1.0:
### Authentication Page
- Input validators: Form cannot be submitted without typing (Must be an email @example.com, password must be at least 12 characters)
- Google Oauth Login: Alternative familiar login feature
- Minimal design. A better design could contribute to film theme with pictures/symbols

### Discover Page
- Buttons to switch from movie to shows (Could be changed to a toggle sliding button or combined together to show both movies and shows)
- Media Card: Minimal design, could use some transparency like IMDb website
- Generate Media button: Simple MUI button and animation, pressing button generates a new movie or show displayed in a card
- Dropdown Menu: Menu to select which collection to save media to (Uses MUI styling, could be improved)

### Connect Page
- Displays all users with option to follow/unfollow and click to see movies they have added (Modal design can look better, a hover design for viewing user's media, separate follow button from profile click, display user's follower/following count)

### My Collection Page
- Buttons to switch from movie to shows (Toggle feature can be set for the user instead of state)
- Create new collection button: Shows text input box (Input box could be designed better, maybe modal?)
- Edit collection button: Shows remove buttons within collection card (can be changed to 'X') **BUG**: Clicking remove navigates user into the collection
- Collection card: Clicking in shows all media added to the collection (Card design can be improved, Could combine all collections with a tag showing movie or show)

### Profile Page
- Shows minimal information about the user (Design can be improved a lot)
- Edit profile button: **BUG**: Save button refreshes page and navigates to collection page(Fix)
- Follower/Following button: Shows users following/follower (Can have click feature for user to navigate to their page or show modal)

### Overall
- Fix routing (May need to restructure how React router was set up to avoid glimpses of unwanted pages and better protection for when logged in or not)
- Tweak visual design (Fit movie/show theme a little or add some colors to make the website easier to look at and not just dull gray)
- Collection changes (Creating new collection can have a checkbox to make main collection or not, clicking a user only shows their main collection)
- Like feature (User can like movies instead of adding to collection, add movie id under likes)
- User profile card (Add a card to isolate user information)
- Trending movies: Movies liked most ?
- Genres to media
- Recommendation feature