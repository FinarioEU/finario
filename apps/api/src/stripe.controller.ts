import { Controller, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
@Controller('stripe')
export class StripeWebhookController {
  @Post('webhook')
  webhook(@Req() req: Request, @Res() res: Response){
    return res.status(200).json({ received: true });
  }
}
