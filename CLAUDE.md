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

1. Code must be modular. Pull related logic into components inside of the components subfolders. If a folder does not exist but you wish to organize your components in such a way that demands a new folder, you may make it. Extremely large files will not be accepted.
2. Any logic that is more than a few lines of code must be placed in utils. Seperation of logic will be functions legible and code modular. You must organize related functions into files.
3. You must define any reused CSS classes in the index.css file to be used across the project.
4. You must enforce typing. Typing is not optional, and using any or unknown is not acceptable except in the case of undocumented types from third party sources. Even in these situations, you should try to find proper typing.
5. You must define types in the types folder. These types should be organized into related files. Interfaces for props may be defined in component files if simple.
6. Complex state objects should be grouped into a data class and mujst not be represented as mutliple tiny state objects.
7. You will use react query for fetching and modifying data. You will properly cache results and invalidate caches upon mutation. Caches should have a stale time of 2 minutes.
