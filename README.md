### You need to Laravel 10 (PHP v8). Node.js version 12.0.

## Installation

### Backend
1. Clone the project.
2. Go to the project root directory.
3. Run ```composer install```
4. Create database.
5. Copy ```.env.example``` into ```.env``` file and adjust parameters.
6. Run ```php artisan key:generate```
7. Generate migrations ```php artisan migrate --seed```, if the seeds are not generated run ```php artisan db:seed --class=CategorySeeder```
8. Run ```php artisan serve``` and go to link  http://localhost:8000

### Frontend
1. Navigate to ```vue``` folder using terminal.
2. Run ```npm install``` to install vue.js project dependencies.
3. Copy ```vue/.env.example``` into ```vue/.env``` and specify API URL.
4. Start frontend by running ```npm run dev```
5. Open http://localhost:3000

### Credentials 
You can register.

## license
The project is open-sourced software licensed under the [MIT license](https://opensource.org/license/mit/).