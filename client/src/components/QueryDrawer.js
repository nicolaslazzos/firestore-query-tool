import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import {
  makeStyles,
  Drawer,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import { onDataRead } from '../actions';
import PathInput from './PathInput';
import WhereInput from './WhereInput';
import ExtraInput from './ExtraInput';
import FirebaseConnection from './FirebaseConnection';

const useStyles = makeStyles((theme) => ({
  drawerContainer: {
    overflow: 'auto',
    padding: 20,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  },
  panelDetails: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15
  },
  executeButton: {
    marginTop: 15,
    alignSelf: 'flex-end'
  }
}));

const emptyPathInput = { collectionName: '', documentId: '' };
const emptyWhereInput = { fieldName: '', condition: '', fieldType: '', fieldValue: '' };
const emptyExtraInput = { extraType: '', extraValue: '' };

const QueryDrawer = props => {
  const [pathInputs, setPathInputs] = useState([emptyPathInput]);
  const [whereInputs, setWhereInputs] = useState([emptyWhereInput]);
  const [extraInputs, setExtraInputs] = useState([emptyExtraInput]);

  const classes = useStyles();

  const onPathInputAdd = () => setPathInputs([...pathInputs, emptyPathInput]);

  const onPathInputDelete = index => setPathInputs(pathInputs.filter((item, i) => i !== index));

  const onPathInputChange = (e, index) => {
    setPathInputs(pathInputs.map((item, i) => {
      if (index === i) return { ...item, [e.target.name]: e.target.value };
      return item;
    }))
  };

  const onWhereInputAdd = () => setWhereInputs([...whereInputs, emptyWhereInput]);

  const onWhereInputDelete = index => setWhereInputs(whereInputs.filter((item, i) => i !== index));

  const onWhereInputChange = (e, index) => {
    setWhereInputs(whereInputs.map((item, i) => {
      if (index === i) return { ...item, [e.target.name]: e.target.value };
      return item;
    }))
  };

  const onExtraInputAdd = () => setExtraInputs([...extraInputs, emptyExtraInput]);

  const onExtraInputDelete = index => setExtraInputs(extraInputs.filter((item, i) => i !== index));

  const onExtraInputChange = (e, index) => {
    setExtraInputs(extraInputs.map((item, i) => {
      if (index === i) return { ...item, [e.target.name]: e.target.value };
      return item;
    }))
  };

  const onExecutePress = () => props.onDataRead({ pathInputs, whereInputs, extraInputs });

  return (
    <Drawer
      anchor='left'
      open={props.open}
      onClose={props.onClose}
    >
      <div className={classes.drawerContainer}>
        <FirebaseConnection />

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>FROM</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.panelDetails}>
            {
              pathInputs.map((item, index) => {
                return (
                  <PathInput
                    value={item}
                    key={index.toString()}
                    onChange={e => onPathInputChange(e, index)}
                    onDeleteClick={() => onPathInputDelete(index)}
                  />
                );
              })
            }
            <Grid spacing={1} container>
              <Grid xs={12} item>
                <Button variant="contained" color="primary" onClick={onPathInputAdd}>ADD PATH</Button>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>WHERE</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.panelDetails}>
            {
              whereInputs.map((item, index) => {
                return (
                  <WhereInput
                    value={item}
                    key={index.toString()}
                    onChange={e => onWhereInputChange(e, index)}
                    onDeleteClick={() => onWhereInputDelete(index)}
                  />
                );
              })
            }
            <Grid spacing={1} container>
              <Grid xs={12} item>
                <Button variant="contained" color="primary" onClick={onWhereInputAdd}>ADD WHERE</Button>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>EXTRA</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.panelDetails}>
            {
              extraInputs.map((item, index) => {
                return (
                  <ExtraInput
                    value={item}
                    key={index.toString()}
                    onChange={e => onExtraInputChange(e, index)}
                    onDeleteClick={() => onExtraInputDelete(index)}
                  />
                );
              })
            }
            <Grid spacing={1} container>
              <Grid xs={12} item>
                <Button variant="contained" color="primary" onClick={onExtraInputAdd}>ADD EXTRA</Button>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <Button variant="contained" color="primary" className={classes.executeButton} onClick={onExecutePress}>EXECUTE QUERY</Button>
      </div>
    </Drawer>
  )
}

export default connect(null, { onDataRead })(QueryDrawer);