import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
  member: Member = {} as Member;
  activeTab?: TabDirective;
  messages: Message[] = [];
  user? : User;

  constructor(private accountService: AccountService, private route: ActivatedRoute, 
    private messageService: MessageService, public presenceService: PresenceService,
    private router: Router) {
      this.accountService.currentUser$.pipe(take(1)).subscribe({
        next: user => {
          if(user) this.user = user;
        }
      });

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     }
  

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data=> this.member = data['member']
    });

    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab']);
      }
    });

   // this.loadMessages();

  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }


  selectTab(tabId: string){
   
    if(this.memberTabs){
      this.memberTabs.tabs.find(x => x.heading === tabId)!.active = true;
    }
  }
  
  loadMessages(){
   
    if(this.member){
      this.messageService.getMessageThread(this.member.userName).subscribe({
        next: messages => this.messages = messages
      });
    }
  }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages' && this.user){
      this.messageService.createHubConnection(this.user, this.member.userName)
    } else {
      this.messageService.stopHubConnection();
    }
  }

}
