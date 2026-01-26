# The App:

LeetGo is an AI powered DSA practice problem platform, allowing users to test their skills against new problems they've never seen before. It is geared towards helping users prepare for interviews and practice new problems.

LeetGo allows users to share, pin, star, and submit problems.

This platform is educational and social, not competitive and intense.

### The code base is organized as follows:

- src: holds all subdirectories
- assets: holds assets like images
- components: holds all components and subfolders (besides routers).
- context: holds context related logic (providers, creators, etc)
- customHooks: holds custom hooks
- routing: holds router and actual app routes
- utils: holds utility functions, such as side effects and complicated logic that would go into onClicks.
- types: holds any and all types to be used in order to properly type the code base.

### This code base uses:

- React with react-router-dom
- TypeScript
- TailwindCSS
- React Query

### You must follow the following guidelines when making edits to this project:

1. Code must be modular. Pull related logic into components inside of the components subfolders. If a folder does not exist but you wish to organize your components in such a way that demands a new folder, you may make it. Extremely large files will not be accepted. This is EXTREMELY important!
2. Any logic that is more than a few lines of code must be placed in utils. Seperation of logic will be functions legible and code modular. You must organize related functions into files.
3. You must define any reused CSS classes in the index.css file to be used across the project.
4. You must enforce typing. Typing is not optional, and using any or unknown is not acceptable except in the case of undocumented types from third party sources. Even in these situations, you should try to find proper typing.
5. You must define types in the types folder. These types should be organized into related files. Interfaces for props may be defined in component files if simple.
6. Complex state objects should be grouped into a data class and mujst not be represented as mutliple tiny state objects.
7. You will use react query for fetching and modifying data. You will properly cache results and invalidate caches upon mutation. Caches should have a stale time of 2 minutes.

### You will follow the following design decisions:

1. You will use the following color pallet: #20C030, #32963C, #00EB17, #366B3B, #2B412D, #2B332B. This applies to a majority of large, app wide components. You may use other colors if you see fit, especially for text.
2. You will use font-raleway for most, if not all, text to keep consistency.
3. You must follow good UI and UX standards with proper visual hiearchy
4. You will make creative choices where applicable. You will not reinvent the wheel and you will not always try to make everything unique, but you will not always be boring either. Strike a balance.
5. You will place all SVG components in the SVGs folder.
6. You will use the animejs library for all complex animations. You can find documentation at https://animejs.com/documentation.
7. All components will be responsive across mobile, tablet, laptoc, and desktop screen sizes.
