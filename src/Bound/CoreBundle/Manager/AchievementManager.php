<?php
/**
 * @Author: gicque_p
 * @Date:   2015-11-30 19:18:30
 * @Last Modified by:   gicque_p
 * @Last Modified time: 2015-12-18 10:33:26
 */

namespace Bound\CoreBundle\Manager;

use Bound\CoreBundle\Manager\PManager;
use Bound\CoreBundle\Entity\Achievement;

use Symfony\Component\HttpKernel\Exception\HttpException;

class AchievementManager extends PManager {

    public function add(Achievement $achievement, $token) {
        $achievement->slugifyTitle();

        if (!$this->alreadyExists($achievement)) {
            if ($achievement->getId() == NULL) {
                $this->pflush($achievement);
                $this->persistAcl($achievement, $token);
            } else {
                throw new HttpException(400, "Entity ID must be NULL.");
            }
        } else {
            throw new HttpException(409, "Entity already exists.");
        }
    }

    public function modify(Achievement $achievement, Achievement $entity) {
        $achievement->setTitle($entity->getTitle());
        $achievement->setContent($entity->getContent());
        $achievement->setPoints($entity->getPoints());

        $this->pflush($achievement);
    }

    public function delete(Achievement $achievement) {
        $this->rflush($achievement);
    }

    public function alreadyExists(Achievement $achievement) {
        $entity = $this->manager->getRepository('BoundCoreBundle:Achievement')->findOneBy(array('slug' => $achievement->getSlug()));

        return $entity != NULL;
    }
};
