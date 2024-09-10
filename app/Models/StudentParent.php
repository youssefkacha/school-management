<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class StudentParent extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable,SoftDeletes;
    protected $fillable = [
        'first_name',
        'last_name',
        'date_of_birth',
        'gender',
        'blood_type',
        'address',
        'last_login',
        'phone',
        'email',
        'password'
    ];
    protected $hidden = [
        'delete_at',
        "email_verified_at",
        'last_login',
        'password',
        'remember_token',
    ];
    protected $casts=[
        'date_of_birth'=>'date:Y-m-d'
    ]; 
    protected $appends=['role'];
    public function getRoleAttribute()
    {
        return 'parent';
    }
}
