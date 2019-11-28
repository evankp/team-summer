import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  LinearProgress,
  Button,
  Avatar
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import * as ProjectStyles from '../components/ProjectPageStyles';

class Project extends React.Component {
  state = {
    project: {
      title: 'Urban Jungle: eco-friendly coffee shop',
      subtitle: 'Fresh Coffee. Community. All rolled into one cup.',
      description: 'Coffee shop will make its best effort to create a unique place where customers can socialize with each other in a comfortable and relaxing environment while enjoying the best brewed coffee or espresso and pastries in town. We will be in the business of helping our customers to relieve their daily stresses by providing piece of mind through great ambience, convenient location, friendly customer service, and products of consistently high quality.',
      industry: 'Food and Craft',
      location: 'San Jose, CA',
      fundingRaised: 30550,
      fundingGoal: 52000,
      backers: 22,
      daysLeft: 200,
      images: [
        '/images/placeholder-sunset.jpg'
      ]
    },
    creator: {
      name: 'James Hampton',
      location: 'Toronto, Canada',
      avatar: ''
    }
  };

  projectHeaderContent() {
    const { classes } = this.props;
    const { industry, subtitle, title } = this.state.project;

    return (
      <ProjectStyles.ProjectHeaderWrapper>
        <Grid container direction="column" alignItems="center">
          <ProjectStyles.IndustryLabel>
            <Typography variant="body1">{industry}</Typography>
          </ProjectStyles.IndustryLabel>
          <Typography variant="h2" className={classes.pageTitle}>{title}</Typography>
          <Typography variant="subtitle2">{subtitle}</Typography>
        </Grid>
      </ProjectStyles.ProjectHeaderWrapper>
    );
  }

  projectDetailsCard() {
    const { classes } = this.props;
    const { description, location, images } = this.state.project;

    return (
      <Card elevation={4}>
        <CardMedia component="img" image={images[0]}
                   title="Project image"
                   height="460"/>
        <CardContent className={classes.projectDetailsContent}>
          <ProjectStyles.DetailsCardAbout>
            <Typography variant="h3">About</Typography>
            <Typography variant="body1">{description}</Typography>
          </ProjectStyles.DetailsCardAbout>
          <Typography variant="h4">Location: </Typography>
          <Typography variant="h5">{location}</Typography>
        </CardContent>
      </Card>
    );
  }

  projectFundraisingCard() {
    const { classes } = this.props;
    const { creator } = this.state;
    const { fundingRaised, fundingGoal, backers, daysLeft } = this.state.project;

    const calculateCompleted = () => {
      const percentageComplete = Math.round((fundingRaised * 100) / fundingGoal);
      return Math.min(percentageComplete, 100);
    };

    return (
      <Card elevation={0}>
        <ProjectStyles.CardLine/>
        <ProjectStyles.FundraisingAmounts>
          <Typography variant="h5">$</Typography>
          <Typography variant="h3">{fundingRaised.toLocaleString()}</Typography>
          <Typography variant="h5" color="secondary">/</Typography>
          <Typography variant="h5" color="secondary">{fundingGoal.toLocaleString()}</Typography>
        </ProjectStyles.FundraisingAmounts>
        <LinearProgress variant="determinate" value={calculateCompleted()}
                        className={classes.fundraisingBar}
                        classes={{
                          root: classes.fundraisingBarSecondary,
                          bar: classes.fundraisingBarPrimary
                        }}/>
        <ProjectStyles.FundraisingStatContainer>
          <ProjectStyles.FundraisingStat>
            <Typography variant="h4">{backers}</Typography>
            <Typography variant="h6" color="secondary">Backers</Typography>
          </ProjectStyles.FundraisingStat>

          <ProjectStyles.FundraisingStat>
            <Typography variant="h4">{daysLeft}</Typography>
            <Typography variant="h6" color="secondary">Days to go</Typography>
          </ProjectStyles.FundraisingStat>
        </ProjectStyles.FundraisingStatContainer>

        <ProjectStyles.CreatorProfile>
          <Avatar>
            {creator.avatar
              ? <img src={creator.avatar} alt="Project creator avatar"/>
              : creator.name.split('')[0]
            }
          </Avatar>
          <Typography variant="h6">{creator.name}</Typography>
          <Typography variant="subtitle2" color="secondary">{creator.location}</Typography>
        </ProjectStyles.CreatorProfile>

        <ProjectStyles.ProjectActionButtons>
          <Button variant="outlined" color="secondary">Send Message</Button>
          <Button variant="contained" color="primary">Fund This Project</Button>
        </ProjectStyles.ProjectActionButtons>
      </Card>
    );
  }

  render() {
    return (
      <ProjectStyles.Main>
        {this.projectHeaderContent()}
        <ProjectStyles.ProjectGrid>
          {this.projectDetailsCard()}
          {this.projectFundraisingCard()}
        </ProjectStyles.ProjectGrid>
      </ProjectStyles.Main>
    );
  }
}

export default withStyles(ProjectStyles.styles)(Project);
