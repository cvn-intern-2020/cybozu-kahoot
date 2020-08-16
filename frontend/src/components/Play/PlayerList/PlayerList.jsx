import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import { keyToVariants } from '../../../common/utils';
import styles from './PlayerList.module.css';

const PlayerList = ({ pin, players, onStart }) => {
    return (
        <Container>
            <Card className={`${styles.card} shadow-lg mb-4`}>
                <Card.Body className="d-flex flex-column">
                    <p className={`${styles.title} text-center`}>PIN: {pin}</p>
                    <Card.Text className={styles.text}>
                        <p>Players: {players.length}</p>
                        {players.length > 0
                            ? players.map((player) => (
                                  <Badge
                                      variant={keyToVariants(player.number)}
                                      key={player.number}
                                      className={`${styles.badge} mr-1`}
                                  >
                                      {player.nickname}
                                  </Badge>
                              ))
                            : null}
                    </Card.Text>
                    {pin && onStart ? (
                        <Button
                            variant="danger"
                            block
                            size="lg"
                            className={`${styles.button} mt-auto`}
                            onClick={() => onStart()}
                        >
                            Start
                        </Button>
                    ) : null}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PlayerList;
