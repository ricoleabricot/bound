<?php

namespace Bound\CoreBundle\Entity;

use Bound\CoreBundle\Entity\Player;

/**
 * NotificationRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class NotificationRepository extends \Doctrine\ORM\EntityRepository {

    public function findByOwnerByDate(Player $player) {
        $qb = $this->createQueryBuilder('n');

        $qb->where('n.owner = :player');
        $qb->orderBy('n.date', "DESC");

        $qb->setParameter(':player', $player);

        return $qb->getQuery()->getResult();
    }
}
