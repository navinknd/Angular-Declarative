import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './pages/add/add.component';
import { DpostComponent } from './pages/dpost/dpost.component';
import { HomeComponent } from './pages/home/home.component';
import { LoaderComponent } from './pages/loader/loader.component';
import { PostComponent } from './pages/post/post.component';


const routes: Routes = [
  {
    path: "", component: DpostComponent
  },
  {
    path: "post", component: PostComponent
  },
  {
    path: "Dpost", component: DpostComponent,
    children: [
      {
        path: "add", component: AddComponent
      }
    ]

  },
  {
    path: "loader", component: LoaderComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
