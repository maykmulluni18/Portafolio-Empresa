<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\CompanySocialController;
use App\Http\Controllers\Api\CompanyTimelineController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\DeliverableController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\PortfolioProjectController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ProjectImageController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ServiceRequestController;
use App\Http\Controllers\Api\TechnologyController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login',    [AuthController::class, 'login']);

Route::get('/companies',                     [CompanyController::class, 'index']);
Route::get('/companies/{company}',           [CompanyController::class, 'show']);
Route::get('/services',                      [ServiceController::class, 'index']);
Route::get('/portfolio',                     [PortfolioProjectController::class, 'index']);
Route::get('/portfolio/{portfolioProject}',  [PortfolioProjectController::class, 'show']);
Route::get('/testimonials',                  [TestimonialController::class, 'index']);
Route::post('/contacts',                     [ContactController::class, 'store']);
Route::get('/technologies',                  [TechnologyController::class, 'index']);

// Protected routes
Route::middleware('auth:api')->group(function () {
    Route::post('/auth/logout',  [AuthController::class, 'logout']);
    Route::post('/auth/refresh', [AuthController::class, 'refresh']);
    Route::get('/auth/me',       [AuthController::class, 'me']);

    Route::apiResource('companies',         CompanyController::class)->except(['index', 'show']);
    Route::apiResource('company-socials',   CompanySocialController::class);
    Route::apiResource('company-timelines', CompanyTimelineController::class);
    Route::apiResource('services',          ServiceController::class)->except(['index']);
    Route::apiResource('clients',           ClientController::class);
    Route::apiResource('requests',          ServiceRequestController::class);
    Route::apiResource('projects',          ProjectController::class);
    Route::apiResource('project-images',    ProjectImageController::class);
    Route::apiResource('deliverables',      DeliverableController::class);
    Route::apiResource('payments',          PaymentController::class);
    Route::apiResource('portfolio',         PortfolioProjectController::class)->except(['index', 'show']);
    Route::apiResource('testimonials',      TestimonialController::class)->except(['index']);
    Route::apiResource('contacts',          ContactController::class)->except(['store']);
    Route::apiResource('technologies',      TechnologyController::class)->except(['index']);
    Route::apiResource('users',             UserController::class);
    Route::apiResource('roles',             RoleController::class);
});
