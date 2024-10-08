import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { AdminBotService } from './adminBot.service';

@Controller('botsettings')
export class AdminBotController {
  constructor(private readonly botService: AdminBotService) {}

  @Get()
  getBotSettings() {
    return this.botService.getBotSettings();
  }

  @Patch()
  updateBotSettings(@Body() body) {
    return this.botService.updateBotSettings(body);
  }
}
