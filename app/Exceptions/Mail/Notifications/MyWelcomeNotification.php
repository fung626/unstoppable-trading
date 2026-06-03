<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;
use Spatie\WelcomeNotification\WelcomeNotification;

class MyWelcomeNotification extends WelcomeNotification
{

    /** @var \Carbon\Carbon */
    public $validUntil;

    /** @var string */
    public $password;

    public function __construct(Carbon $validUntil, $password)
    {
        parent::__construct($validUntil);
        $this->validUntil = $validUntil;
        $this->password = $password;
    }

    public function buildWelcomeNotificationMessage(): MailMessage
    {
        return (new MailMessage)
            ->subject(Lang::get('Welcome'))
            ->line(Lang::get('You are receiving this email because an account was created for you.'))
            ->line(Lang::get('Your password is :password.', ['password' => $this->password]));
        // ->action(Lang::get('Reset your initial password'), $this->showWelcomeFormUrl)
        // ->line(Lang::get('This welcome link will expire in :count minutes.', ['count' => $this->validUntil->diffInRealMinutes()]));
    }
}