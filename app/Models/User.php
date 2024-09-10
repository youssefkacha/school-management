<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'email',
    'password',
    'first_name',
    'last_name',
    'date_of_birth',
    'last_login',
    'gender',
    'blood_type',
    'student_parent_id',
    'email',
    'password',
    
  ];
  protected $dates = ['created_at', 'updated_at'];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];
  protected $appends = ['role'];

  public function getRoleAttribute()
  {
    return 'student';
  }
  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'date_of_birth' => 'date:Y-m-d',
    'email_verified_at' => 'datetime',
    'password' => 'hashed',

  ];
}
